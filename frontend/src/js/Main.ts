import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Backend } from "./Backend";
import { TaskLoader } from "./tasks/TaskLoader";
import { ConfidenceWindow } from "./io/ConfidenceWindow";
import { ResultLog } from "./metrics/ResultLog";
import { BrowserDetails } from "./BrowserDetails";
import { SavedSession, NewSession, TestSessionStorage, ResultStorage, SavedResult, NewResult } from "./TestSessionStorage";
import { TaskFactory } from "./tasks";
import { DefaultElementSizeSettings } from "./ui/ElementSizeSettings";

let UI : UserInterface;
let LoadingScreen : ConfidenceWindow;
let backend = new Backend();

let Results : ResultLog = new ResultLog();

let SessionStorage : TestSessionStorage;
let ResultsStorage : ResultStorage;
let testList : TaskList;
let CurrentTask : Task;
let ResolveLoading : (task : Task) => void;

let uiUpdateTimer : any;

$(async function Main()
{
	UI = new UserInterface();
	LoadingScreen = UI.GetIntermediateTestScreen();

	let browser = new BrowserDetails();

	if (browser.IsMobile())
	{
		UI.ViewModeMobileBrowserRejection();
		return;
	}

	await LoadSession();
	ApplyPageEventHandlers();
	
	NextTask();
});

async function LoadSession()
{
	ResultsStorage = SavedResult.IsLocalResultSaved()?
		new SavedResult() : new NewResult();
	
	Results = await ResultsStorage.Load();

	let factory = new TaskFactory(
		backend,
		Results,
		new DefaultElementSizeSettings()
	);

	SessionStorage = SavedSession.IsLocalSessionSaved()?
		new SavedSession(factory)
		:
		new NewSession(factory, backend, Results);
	
	testList = await SessionStorage.Load();
}

function ApplyPageEventHandlers()
{
	$("#submit-test").click(() =>
	{
		try
		{
			CurrentTask.Submit();
		}
		catch (err)
		{
			UI.SetErrorMessage(err.message);
		}
	});	
}

async function NextTask()
{
	var isUsingLoadingScreen = false;

	if (testList.IsComplete())
	{
		AllTestsCompleted();
		return;
	}

	if (CurrentTask && CurrentTask.IsConfidenceTracked())
	{
		LoadingScreen.ResetConfidence();
		LoadingScreen.ShowConfidenceBar();
	}
	else
	{
		LoadingScreen.HideConfidenceBar();
	}

	let nextTask = testList.Next();

	if (
		CurrentTask
		// && CurrentTask.IsConfidenceTracked()
		// || nextTask && nextTask instanceof TaskLoader
	)
	{
		isUsingLoadingScreen = true;
		
		LoadingScreen.OnSubmit = () =>
		{
			let confidence = LoadingScreen.ConfidenceValue();
			CurrentTask.SetConfidence(confidence);
			LoadingScreen.Hide();
			CurrentTask.GetTimer().Start();
		};

		LoadingScreen.Show();
	}

	//Possible load error 1: load from provider
	if (nextTask instanceof TaskLoader)
	{
		CurrentTask = await BeginLoadingTask(nextTask);
	}
	else
	{
		CurrentTask = nextTask;
	}

	CurrentTask.GetTimer().TickCallback = () =>
	{
		UI.SetTimerProgress(CurrentTask.GetTimer().Progress())
	};

	if (CurrentTask.IsPractice)
		CurrentTask.ApplyPracticeProperties();

	await BeginTaskInitialize(CurrentTask);

	if (!isUsingLoadingScreen)
		CurrentTask.GetTimer().Start();

	await CurrentTask.Controller.WaitForCompletion()
	CurrentTask.GetTimer().Stop();

	if (CurrentTask.IsResultsTracked())
		CurrentTask.LogResults(Results);
		
	await CurrentTask.Finish();

	// SessionStorage.Save(testList);
	// ResultsStorage.Save(Results);

	NextTask();
}

async function BeginLoadingTask(provider : TaskLoader) : Promise<Task>
{
	LoadingScreen.OnRetryLoading = async () =>
	{
		TryLoadTask(provider);
	};

	return new Promise(async (resolve, reject) =>
	{
		ResolveLoading = resolve;
		TryLoadTask(provider);
	});
}

async function TryLoadTask(provider : TaskLoader)
{
	LoadingScreen.ShowLoading();

	try
	{
		let test = await provider.Create();
		ResolveLoading(test);
	}
	catch (err)
	{
		console.error(err);
		LoadingScreen.ShowLoadingFailed();
	}
}

async function BeginTaskInitialize(task : Task)
{
	return new Promise((resolve, reject) =>
	{
		ResolveLoading = resolve;
		TryTaskInitialize(task);
	});
}

async function TryTaskInitialize(task : Task)
{
	LoadingScreen.ShowLoading();

	LoadingScreen.OnRetryLoading = async () =>
	{
		TryTaskInitialize(task);
	};

	try
	{
		await task.Initialize();
		DisplayTask(task);
		LoadingScreen.ShowNextTestReady();
		ResolveLoading(task);
	}
	catch (err)
	{
		console.error(err);
		LoadingScreen.ShowLoadingFailed();
	}
}

function AllTestsCompleted()
{
}

function DisplayTask(task : Task)
{
	UI.ClearView();
	UI.ClearErrorMessage();
	
	UI.SetTimerProgress(0);

	UI.SetTitle(task.GetTitle());
	UI.SetPrompt(task.GetPrompt());
	UI.ShowOptions(task);

	UI.SubmitButton().html("Submit &raquo;");
	
	if (task.IsExplicitSubmissionRequired())
	{
		UI.ShowSubmitButton();
	}
	else
		UI.HideSubmitButton();
	
	task.Display.Display(UI);
}