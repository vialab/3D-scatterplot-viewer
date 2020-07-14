import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Timer } from "./metrics";
import { TestingComplete } from "./forms/TestingComplete";

import * as Bowser from "bowser";
import { PieChart } from "./tests/PieChart/PieChart";
import { PieChartData } from "./tests/PieChart/PieChartData";
import { Colour } from "./io/Colour";
import { ScatterPlot } from "./tests/ScatterPlot/ScatterPlot";
import { PlotPoint } from "./tests/ScatterPlot/PlotPoint";
import { InteractablePlotView } from "./tests/ScatterPlot/InteractablePlotView";
import { MultiPlotView } from "./tests/ScatterPlot/MultiPlotView";
console.log(Bowser.parse(window.navigator.userAgent));

let display : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;
$(() =>
{
	display = new UserInterface();

	let interactablePlotView = new InteractablePlotView(RandomPoints(100, -290, 290), 600);
	let interactablePlot = new ScatterPlot();
	interactablePlot.SetDisplay(interactablePlotView);
	
	let multiPlotView = new MultiPlotView(RandomPoints(100, -190, 190), 400);
	let multiPlot = new ScatterPlot();
	multiPlot.SetDisplay(multiPlotView);

	let piechart = new PieChart(
		RandomPiechart(6),
		RandomPiechart(6)
	);
	piechart.SetPrompt("Do these charts represent the same data?");

	testList  = new TaskList([
		// multiPlot,
		interactablePlot,
		piechart,
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
		let colour = new Colour(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 0.5 + 0.5);

		result[i] = new PieChartData("" + i, value, colour);
	}

	return result;
}

function RandomPoints(numberOfPoints : number, min : number, max : number) : PlotPoint[]
{
	let points : PlotPoint[] = [];

	for (let i = 0; i < numberOfPoints; i++)
	{
		points[i] = new PlotPoint(randomValue(), randomValue(), randomValue());
	}

	return points;

	function randomValue()
	{
		return Math.random() * (max - min) + min;
	}
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
		NextTask();
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
	
	//TODO temp code for mockups to show timer functionality
	if (task.IsConfidenceTracked())
	{
		display.SetTimerProgress(Math.random() * 75);
	}
	
	let result : TaskResult = await task.WaitForCompletion();

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
	display.ClearView();
	
	display.SetTimerProgress(0);

	display.SetTitle(task.GetTitle());
	display.SetPrompt(task.GetPrompt());
	display.ShowOptions(task);
	if (task.IsExplicitSubmissionRequired())
		display.ShowSubmitButton();
	else
		display.HideSubmitButton();
	
	task.GetDisplay().Display(display);
}