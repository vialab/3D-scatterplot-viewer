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
import { SampleCardInstruction } from "./tests/SampleCard/SampleCardInstruction";

let display : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;

$(() =>
{
	let graphInst = new SampleComparisonInstruction(
		"images/sample_graph_1.png",
		"images/sample_graph_2.png"
	);
	graphInst.SetPrompt("You will be shown two graphs. Select whether the graphs are equivalent.");
	let graphPractice = new SampleComparison(
		"images/sample_graph_1.png",
		"images/sample_graph_2.png"
	);
	ApplyPracticeProperties(graphPractice);
	let graphTest = new SampleComparison(
		"images/sample_graph_1.png",
		"images/sample_graph_2.png"
	);

	let graph3dinst = new SampleComparisonInstruction(
		"images/3dgraph1.png",
		"images/3dgraph2.png"
	);
	graph3dinst.SetPrompt("You will be shown two graphs. Select whether the graphs are equivalent.");
	let graph3dTrial = new SampleComparison(
		"images/3dgraph1.png",
		"images/3dgraph2.png"
	);
	ApplyPracticeProperties(graph3dTrial);
	let graph3d = new SampleComparison(
		"images/3dgraph1.png",
		"images/3dgraph2.png"
	);

	let piechartInst = new SampleComparisonInstruction(
		"images/sample-piechart.png",
		"images/sample-piechart-rotated.png"	
	);
	piechartInst.SetPrompt(
		"You will be shown two pie charts.<br />"
		+ "Choose whether the two pie charts represent the same data."
	);
	let piechartTrial = new SampleComparison(
		"images/sample-piechart.png",
		"images/sample-piechart-rotated.png"	
	);
	ApplyPracticeProperties(piechartTrial);
	let piechart = new SampleComparison(
		"images/sample-piechart.png",
		"images/sample-piechart-rotated.png"	
	);

	let rotationInst = new Sample3DInstruction();
	let rotationTrial = new Sample3DRotation();
	ApplyPracticeProperties(rotationTrial);
	let rotation = new Sample3DRotation();

	let foldInst = new SampleFoldInstruction();
	let foldTrial = new SampleFold();
	ApplyPracticeProperties(foldTrial);
	let fold = new SampleFold();
	
	let cardInst = new SampleCardInstruction();
	let cardTrial = new SampleCard();
	ApplyPracticeProperties(cardTrial);
	let card = new SampleCard();
	
	let CONTOUR_PROMPT = "Does the 3d plot represent the isocontour?";
	let contourInst = new SampleComparisonInstruction(
		"images/Contour_Plot.jpg",
		"images/3D_Surface.jpg"
	);
	contourInst.SetPrompt(
		"You will be shown a 2D Isocontour of a graph, and a 3D graph.<br />"
		+ "Specify whether the 3D graph shown is representitave of the isocontour provided."
	);
	let contourTrial = new SampleComparison(
		"images/Contour_Plot.jpg",
		"images/3D_Surface.jpg"
	);
	contourTrial.SetPrompt(CONTOUR_PROMPT);
	ApplyPracticeProperties(contourTrial);
	let contour = new SampleComparison(
		"images/Contour_Plot.jpg",
		"images/3D_Surface.jpg"
	);
	contour.SetPrompt(CONTOUR_PROMPT);

	let scatterplotInst = new SampleComparisonInstruction(
		"images/scatterplotmain.png",
		"images/scatterplothover.png"
	);
	scatterplotInst.SetPrompt(
		"You will be shown the orthographic view of a scatter plot and the 3d scatter plot corresponding to it. Choose the plane from which the orthographic view is from.<br />"
		+ "Hovering a square of the net will highlight the corresponding plane on the viewing cube. Click that plane to select it."
	)
	let scatterplotTrial = new SampleImageMockup("images/scatterplotmain.png");
	scatterplotTrial.SetExplicitSubmissionRequired(true);
	ApplyPracticeProperties(scatterplotTrial);
	let scatterplot = new SampleImageMockup("images/scatterplotmain.png");
	scatterplot.SetCofidenceTracked(true);
	scatterplot.SetExplicitSubmissionRequired(true);
	let scatterplothover = new SampleImageMockup("images/scatterplothover.png");
	scatterplothover.SetCofidenceTracked(true);
	scatterplothover.SetExplicitSubmissionRequired(true);

	display = new UserInterface();
	testList  = new TaskList([
		// new Consent(),

		//Graph
		graphInst,
		graphPractice,
		graphTest,

		//3D Graph
		graph3dinst,
		graph3dTrial,
		graph3d,

		//Piechart
		piechartInst,
		piechartTrial,
		piechart,

		//3d Rotation
		rotationInst,
		rotationTrial,
		rotation,

		// Paper Folding
		foldInst,
		foldTrial,
		fold,

		// Card rotation
		cardInst,
		cardTrial,
		card,

		// Contour
		contourInst,
		contourTrial,
		contour,

		//Scatter Plot
		scatterplotInst,
		scatterplotTrial,
		scatterplot,
		scatterplothover,
	]);

	ApplyPageEventHandlers();
	
	NextTask();
});

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
	display.SetTimerProgress(0);

	display.SetTitle(task.GetTitle());
	display.SetOptionsPrompt(task.GetPrompt());
	display.ShowOptions(task);
	task.GetDisplay().Display(display);

	if (task.IsExplicitSubmissionRequired())
		display.ShowSubmitButton();
	else
		display.HideSubmitButton();
}