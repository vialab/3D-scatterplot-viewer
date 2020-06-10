import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Timer } from "./metrics";
import {SampleComparison} from "./tests/SampleComparison/SampleComparison";
import {SampleComparisonInstruction} from "./tests/SampleComparison/SampleComparisonInstruction";
import { SampleTimedTest } from "./tests/SampleTimedTest/SampleTimedTest";
import { Consent } from "./forms/Consent";
import { TestingComplete } from "./forms/TestingComplete";
import { Sample3DInstruction } from "./tests/Sample3DRotation/Sample3DInstructions";
import { Sample3DRotation } from "./tests/Sample3DRotation/Sample3DRotation";
import { SampleFold } from "./tests/SampleFold/SampleFold";
import { SampleFoldInstruction } from "./tests/SampleFold/SampleFoldInstruction";
import { SampleCard } from "./tests/SampleCard/SampleCard";
import { SampleImageMockup } from "./tests/SampleImageMockup/SampleImageMockup";

let display : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;

$(() =>
{
	let graph3dinst = new SampleComparisonInstruction(
		"images/3dgraph1.png",
		"images/3dgraph2.png"
	)
	let graph3d = new SampleComparison(
		"images/3dgraph1.png",
		"images/3dgraph2.png"
	);

	let contour = new SampleComparison(
		"images/Contour_Plot.jpg",
		"images/3D_Surface.jpg"
	);
	contour.SetPrompt("Does the graph match the contour?");

	let scatterplot = new SampleImageMockup("images/scatterplotmain.png");
	scatterplot.SetCofidenceTracked(true);
	let scatterplothover = new SampleImageMockup("images/scatterplothover.png");
	scatterplothover.SetCofidenceTracked(true);

	display = new UserInterface();
	testList  = new TaskList([
		new Consent(),

		//Graph
		new SampleComparisonInstruction(
			"images/sample_graph_1.png",
			"images/sample_graph_2.png"
		),
		new SampleComparison(
			"images/sample_graph_1.png",
			"images/sample_graph_2.png"
		),

		//3D Graph
		graph3dinst,
		graph3d,

		//Piechart
		new SampleComparisonInstruction(
			"images/sample-piechart.png",
			"images/sample-piechart-rotated.png"	
		),
		new SampleComparison(
			"images/sample-piechart.png",
			"images/sample-piechart-rotated.png"	
		),

		//3d Rotation
		new Sample3DInstruction(),
		new Sample3DRotation(),

		// Paper Folding
		new SampleFoldInstruction(),
		new SampleFold(),

		// Card rotation
		new SampleCard(),

		// Contour
		contour,

		//Scatter Plot
		scatterplot,
		scatterplothover,
	]);

	ApplyPageEventHandlers();
	
	NextTask();
});

function ApplyPageEventHandlers()
{
	$(".next").click(() =>
	{
		NextTask();
	});
}

async function NextTask() : Promise<void>
{
	clearInterval(uiUpdateTimer);

	if (testList.IsComplete())
	{
		AllTestsCompleted();
		return;
	}

	task = testList.Next();
	let timer : Timer = task.GetTimer();

	DisplayTask(task);
	
	timer.Begin();
	uiUpdateTimer = setInterval(() =>
		{
			//TODO js setinterval is inconsistent, timer is jumpy at points
			//  Possible solutions:
			//     - Really low time interval (timers internally use accurate time so they'll be fine)
			//     so function runs more
			//     - Look for more consistent timer implementation
			timer.Tick();
			display.SetTimerProgress(Math.ceil(timer.Progress()));
		},
		10
	);
	
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
	display.SetTitle(task.GetTitle());
	display.SetOptionsPrompt(task.GetPrompt());
	display.ShowOptions(task);
	task.GetDisplay().Display(display);

	if (task.IsConfidenceTracked())
		display.ShowConfidenceSlider();
	else
		display.HideConfidenceSlider();
}