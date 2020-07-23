import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Timer } from "./metrics";
import { TestingComplete } from "./forms/TestingComplete";

import * as Bowser from "bowser";
import { PieChartData } from "./tests/PieChart/PieChartData";
import { Color } from "./io/ui/Color";
import { Point } from "./PlotData/Point";
import { ScatterPlot } from "./tests/ScatterPlot/ScatterPlot";
import { PlaneDisplay } from "./tests/Isocontour/PlaneDisplay";

import Plane from "./PlotData/gaussianSurface";
import { CsvParser } from "./PlotData/CsvParser";
import { InteractablePlotView } from "./tests/ScatterPlot/InteractablePlotView";
import PlotData from "./PlotData/iris";
import { MultiPlotView } from "./tests/ScatterPlot/MultiPlotView";
import { Normalizer } from "./PlotData/Normalizer";

let EXAMPLE_PLANE_AXIS_LENGTH = 600;

let display : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;

$(function Main()
{
	display = new UserInterface();
	let visTaskWrapper = new ScatterPlot();
	let waves = GenerateWaveGraph(40, EXAMPLE_PLANE_AXIS_LENGTH/1.8, 13);
	let pyramid = PyramidPoints(EXAMPLE_PLANE_AXIS_LENGTH/1.8);
	
	let examplePlaneParser = new CsvParser(Plane);
	let examplePlane = examplePlaneParser.ParsePoints();

	let planeDisplay = new PlaneDisplay(waves, EXAMPLE_PLANE_AXIS_LENGTH);
	visTaskWrapper.SetDisplay(planeDisplay);
	
	let parsedPlotData = new CsvParser(<number[]>PlotData, 12, 500).ParsePoints();
	let scatterPlotDisplay = new InteractablePlotView(parsedPlotData, 600);
	let multiDisplay = new MultiPlotView(parsedPlotData, 400);
	let scatterplot = new ScatterPlot();
	scatterplot.SetDisplay(scatterPlotDisplay);

	testList = new TaskList([
		// scatterplot,
		visTaskWrapper,
	]);
	
	ApplyPageEventHandlers();
	
	NextTask();
});

function PyramidPoints(baseSideLength : number) : Point[]
{
	let maxValue = baseSideLength/2;

	return Normalizer.Normalize([
		new Point(-maxValue, 0, -maxValue),
		new Point(maxValue, 0, -maxValue),
		new Point(0, maxValue, 0),
		new Point(-maxValue, 0, maxValue),
		new Point(maxValue, 0, maxValue),
	]);
}

function GenerateWaveGraph(pointsPerSlice : number, dimension : number, multiplier : number=1) : Point[]
{
	let points : Point[] = [];
	let increment = 1/pointsPerSlice;

	for (let x = 0; x < 1; x +=increment)
	{
		for (let z = 0; z < 1; z += increment)
		{
			let screenY = (Math.sin(x*multiplier)-Math.cos(z*multiplier))*dimension;
			let screenX = x*dimension - dimension/2;
			let screenZ = z*dimension - dimension/2;

			points.push(new Point(screenX, screenY, screenZ));
		}
	}

	return Normalizer.Normalize(points);
}

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

function RandomPoints(numberOfPoints : number, min : number, max : number) : Point[]
{
	let points : Point[] = [];

	for (let i = 0; i < numberOfPoints; i++)
	{
		points[i] = new Point(randomValue(), randomValue(), randomValue());
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