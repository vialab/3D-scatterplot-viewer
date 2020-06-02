import {TestResult} from "./testing/TestResult";
import {Test} from "./testing/Test";
import {TestPlan} from "./testing/TestPlan";
import {UserInterface} from "./io/GlobalDisplay";

import { SampleTest } from "./tests/SampleTest/SampleTest";

let display : UserInterface;
let testList : TestPlan;

$(() =>
{
	display = new UserInterface();
	testList  = new TestPlan([
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

	let test : Test = testList.Next();

	display.SetTimerProgress(25);
	display.SetTitle(test.GetTitle());
	test.GetDisplay().Display(display);
	display.ShowOptions(test.GetOptions());
	
	let result : TestResult = await test.WaitForCompletion();
	//TODO submit results somewhere

	NextTest();
}