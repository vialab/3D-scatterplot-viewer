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

import {CsvParser} from "./PlotData/CsvParser";

import WineData from "./PlotData/winequality-red";
import IrisData from "./PlotData/iris";

console.log(Bowser.parse(window.navigator.userAgent));

let display : UserInterface;
let testList : TaskList;
let task : Task;

let INTERACTABLE_PLOT_AXIS_LENGTH = 600;
let INTERACTABLE_PLOT_PADDING = 20;

let uiUpdateTimer : any;
$(() =>
{
	display = new UserInterface();
	
	let pointAxisLength = INTERACTABLE_PLOT_AXIS_LENGTH - INTERACTABLE_PLOT_PADDING*2;

	//Plot points for interactable plot
	let irisParser : CsvParser = new CsvParser(<number[]>IrisData, 12, 500);
	let irisDataset = irisParser.PasePoints(pointAxisLength);
	let wineDataset = new CsvParser(<number[]>WineData, 13, 500).PasePoints(pointAxisLength);
	let noise = RandomPoints(40, -280, 280);
	let alteredWineData = wineDataset.concat(noise);
	let alteredIrisData = irisDataset.concat(noise);
	
	let winePlotView = new InteractablePlotView(alteredWineData, INTERACTABLE_PLOT_AXIS_LENGTH);
	let winePlot = new ScatterPlot();
	winePlot.SetDisplay(winePlotView);

	let irisPlotView = new InteractablePlotView(alteredIrisData, INTERACTABLE_PLOT_AXIS_LENGTH);
	let irisPlot = new ScatterPlot();
	irisPlot.SetDisplay(irisPlotView);

	let irisMultiViewDataset = irisParser.PasePoints(400);
	let multiViewDatasetNoise = RandomPoints(40, -180, 180);
	irisMultiViewDataset = irisMultiViewDataset.concat(multiViewDatasetNoise);
	let irisMultiPlotView = new MultiPlotView(irisMultiViewDataset, 400);
	let irisMultiPlot = new ScatterPlot();
	irisMultiPlot.SetDisplay(irisMultiPlotView);

	let piechart = new PieChart(
		RandomPiechart(6),
		RandomPiechart(6)
	);
	piechart.SetPrompt("Do these charts represent the same data?");

	testList  = new TaskList([
		irisMultiPlot,
		irisPlot,
		winePlot,
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