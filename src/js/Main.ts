import {TaskResult} from "./tasks/TaskResult";
import {Task} from "./tasks/Task";
import {TaskList} from "./tasks/TaskList";
import {UserInterface} from "./io/UserInterface";

import { SampleTest } from "./tests/SampleTest/SampleTest";

let display : UserInterface;
let testList : TaskList;

$(() =>
{
	display = new UserInterface();
	testList  = new TaskList([
		new SampleTest()
	]);
	
	NextTest();
});

async function NextTest() : Promise<void>
{
	if (testList.IsComplete())
	{
		//TODO show "test over" notification overlay
		return;
	}

	let test : Task = testList.Next();

	display.SetTimerProgress(25);
	display.SetTitle(test.GetTitle());
	test.GetDisplay().Display(display);
	display.ShowOptions(test.GetOptions());
	
	let result : TaskResult = await test.WaitForCompletion();
	//TODO submit results somewhere

	NextTest();
}