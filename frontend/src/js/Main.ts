import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Timer } from "./metrics";
import { TestingComplete } from "./forms/TestingComplete";

import { PieChartData } from "./tests/PieChart/PieChartData";
import { Color } from "./ui/Color";

import { RandomIsocontourProvider } from "./tests/Isocontour/RandomIsocontourProvider";
import { DemographicTask } from "./forms/demograpic";
import { IshiharaTask } from "./forms/ishihara";
import { ScatterPlotDatasetLoader } from "./tests/ScatterPlot/ScatterPlotDatasetLoader";
import { IsocontourTutorial } from "./tests/Isocontour/IsocontourTutorial";
import { DemographicExclusion } from "./forms/exclusion";
import { Backend } from "./Backend";
import { DatasetParser } from "./plotData/DatasetParser";
import { IndependentAxisNormalizer } from "./plotData/normalization/IndependentAxisNormalizer";
import { TaskLoader } from "./tasks/TaskLoader";
import { ConfidenceWindow } from "./io/ConfidenceWindow";
import { ResultLog } from "./metrics/ResultLog";
import {BrowserDetails} from "./BrowserDetails";
import { SavedSession, NewSession } from "./TaskListLoader";
import { TaskFactory } from "./tasks";

let UI : UserInterface;
let LoadingScreen : ConfidenceWindow;
let backend = new Backend();

let Results : ResultLog = new ResultLog();

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
	let sessionLoader = SavedSession.IsLocalSessionSaved()?
		new SavedSession(new TaskFactory(backend, Results))
		:
		new NewSession(backend, Results);
	
	let [taskList, results] = await Promise.all([
		sessionLoader.LoadList(),
		sessionLoader.LoadResults()
	]);

	testList = taskList;
	Results = results;
}

function ApplyPageEventHandlers()
{
	$("#submit-test").click(() =>
	{
		CurrentTask.Controller.Submit([]);
	});	
}

async function NextTask()
{
	if (testList.IsComplete())
	{
		AllTestsCompleted();
		return;
	}
	
	let nextTask = testList.Next();

	if (
		CurrentTask && CurrentTask.IsConfidenceTracked()
		|| nextTask && nextTask instanceof TaskLoader
	)
		LoadingScreen.Show();

	//Possible load error 1: load from provider
	if (nextTask instanceof TaskLoader)
	{
		CurrentTask = await BeginLoadingProvider(nextTask);
	}
	else
	{
		CurrentTask = nextTask;
	}

	if (CurrentTask.IsConfidenceTracked())
	{
		LoadingScreen.ShowConfidenceBar();

		LoadingScreen.OnSubmit = () =>
		{
			let confidence = LoadingScreen.ConfidenceValue();
			CurrentTask.SetConfidence(confidence);
			LoadingScreen.Hide();
		};
	}
	else
	{
		LoadingScreen.HideConfidenceBar();
	}

	await BeginInitialize(CurrentTask);
	await PerformTask(CurrentTask);

	NextTask();
}

async function BeginLoadingProvider(provider : TaskLoader) : Promise<Task>
{
	LoadingScreen.OnRetryLoading = async () =>
	{
		TryLoadProvider(provider);
	};

	return new Promise(async (resolve, reject) =>
	{
		ResolveLoading = resolve;
		TryLoadProvider(provider);
	});
}

async function TryLoadProvider(provider : TaskLoader)
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

async function BeginInitialize(task : Task)
{
	return new Promise((resolve, reject) =>
	{
		ResolveLoading = resolve;
		TryInitialize(task);
	});
}

async function TryInitialize(task : Task)
{
	LoadingScreen.ShowLoading();

	LoadingScreen.OnRetryLoading = async () =>
	{
		TryInitialize(task);
	};

	try
	{
		//Possible load error 2: in Initialize
		await task.Initialize();

		//Possible load error 2: in display
		DisplayTask(task);

		//Possible load error 3: Images not loaded

		//Catch-all for load errors; notify the server if possbile
		// If cannot contact server, internet is likely down

		LoadingScreen.ShowNextTestReady();
		ResolveLoading(task);
	}
	catch (err)
	{
		console.error(err);
		LoadingScreen.ShowLoadingFailed();
	}
}

async function PerformTask(task : Task)
{
	let result = await task.Controller.WaitForCompletion();
	task.LogResults(Results);
}

function AllTestsCompleted()
{
}

function DisplayTask(task : Task)
{
	UI.ClearView();
	
	UI.SetTimerProgress(0);

	UI.SetTitle(task.GetTitle());
	UI.SetPrompt(task.GetPrompt());
	UI.ShowOptions(task);
	
	if (task.IsExplicitSubmissionRequired())
		UI.ShowSubmitButton();
	else
		UI.HideSubmitButton();
	
	task.Display.Display(UI);
}