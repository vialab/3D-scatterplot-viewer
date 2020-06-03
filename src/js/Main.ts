import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { SampleTest } from "./tests/SampleTest/SampleTest";
import { Timer } from "./metrics";
import { SampleTestTimed } from "./tests/SampleTestTimed.ts/SampleTestTimed";

let display : UserInterface;
let testList : TaskList;
let task : Task;

let uiUpdateTimer : any;

$(() =>
{
	display = new UserInterface();
	testList  = new TaskList([
		new SampleTestTimed(),
		new SampleTest()
	]);
	
	NextTask();
});

async function NextTask() : Promise<void>
{
	if (testList.IsComplete())
	{
		//TODO show "test over" notification overlay
		return;
	}

	clearInterval(uiUpdateTimer);

	task = testList.Next();
	let timer : Timer = task.GetTimer();

	display.SetTitle(task.GetTitle());
	task.GetDisplay().Display(display);
	display.ShowOptions(task.GetOptions());

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
	//TODO submit results somewhere

	NextTask();
}