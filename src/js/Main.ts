import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { Timer } from "./metrics";
import {SampleComparison} from "./tests/SampleComparison/SampleComparison";
import { SampleTimedTest } from "./tests/SampleTimedTest/SampleTimedTest";
import { Consent } from "./forms/Consent";
import { GraphInstruction } from "./forms/GraphInstruction";
import { TestingComplete } from "./forms/TestingComplete";

let display : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;

$(() =>
{
	display = new UserInterface();
	testList  = new TaskList([
		new Consent(),
		new GraphInstruction(),
		new SampleComparison(
			"images/sample_graph_1.png",
			"images/sample_graph_2.png"
		),
		new SampleTimedTest(),
		new SampleComparison(
			"images/sample-piechart.png",
			"images/sample-piechart.png"	
		)
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