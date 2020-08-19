import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Timer } from "./metrics";
import { TestingComplete } from "./forms/TestingComplete";

import { PieChartData } from "./tests/PieChart/PieChartData";
import { Color } from "./ui/Color";

import { RandomIsocontourProvider } from "./tests/Isocontour/RandomIsocontourProvider";
import { DemographicSurvey } from "./forms/demograpic";
import { IshiharaTest } from "./forms/ishihara";
import { RandomScatterPlotProvider } from "./tests/ScatterPlot/RandomScatterPlotProvider";
import { IsocontourTutorial } from "./tests/Isocontour/IsocontourTutorial";

let EXAMPLE_PLANE_AXIS_LENGTH = 450;

let UI : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;

$(function Main()
{
	UI = new UserInterface();
	let contour = new RandomIsocontourProvider(EXAMPLE_PLANE_AXIS_LENGTH);
	let ScatterPlot = new RandomScatterPlotProvider(EXAMPLE_PLANE_AXIS_LENGTH);

	testList = new TaskList([
		// new DemographicSurvey(),
		// new IshiharaTest(),
		// contour.Tutorial(),
		contour.Create(),
		ScatterPlot.Create(),
	]);
	
	ApplyPageEventHandlers();
	
	NextTask();
});

function RandomPiechart(numberOfSlices : number) : PieChartData[]
{
	const MAX_VALUE = 6;
	const MIN_VALUE = 0;

	let result : PieChartData[] = [];

	for (let i = 0; i < 6; i++)
	{
		let value : number = Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE;
		let colour = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 0.5 + 0.5);

		result[i] = new PieChartData("" + i, value, colour);
	}

	return result;
}

function ApplyPracticeProperties(task : Task)
{
	let promptAppend = "&#9888; This is an example of the test you are about to do. Results of this test are not tracked.";
	
	task.SetTitle("Instructions");
	task.SetPrompt(
		task.GetPrompt() != ""?
			task.GetPrompt() + "<br />" + promptAppend
			: promptAppend
	);
	task.SetCofidenceTracked(false);
	task.SetResultsTracked(false);
}

function ApplyPageEventHandlers()
{
	$("#submit-test").click(() =>
	{
		task.Controller.Submit([]);
	});
}

async function NextTask() : Promise<void>
{
	// clearInterval(uiUpdateTimer);

	if (testList.IsComplete())
	{
		AllTestsCompleted();
		return;
	}

	task = testList.Next();
	let timer : Timer = task.GetTimer();

	DisplayTask(task);
	
	// timer.Begin();
	// uiUpdateTimer = setInterval(() =>
	// 	{
	// 		//TODO js setinterval is inconsistent, timer is jumpy at points
	// 		//  Possible solutions:
	// 		//     - Really low time interval (timers internally use accurate time so they'll be fine)
	// 		//     so function runs more
	// 		//     - Look for more consistent timer implementation
	// 		timer.Tick();
	// 		display.SetTimerProgress(Math.ceil(timer.Progress()));
	// 	},
	// 	10
	// );
	
	let result : TaskResult = await task.Controller.WaitForCompletion();

	if (task.IsConfidenceTracked())
	{
		UI.GetIntermediateTestScreen().OnSubmit = () =>
		{
			result.Confidence = UI.GetIntermediateTestScreen().ConfidenceValue();
		};
		
		UI.GetIntermediateTestScreen().Show();
	}

	if (task.IsResultsTracked())
	{
		//TODO submit results somewhere
	}

	NextTask();
}

function AllTestsCompleted()
{
	DisplayTask(new TestingComplete());
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