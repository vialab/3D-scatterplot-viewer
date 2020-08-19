import { Task, Option, TaskResult } from "../tasks";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";
import { TaskController } from "../tasks/TaskController";

export class TestingComplete extends Task
{
	constructor()
	{
		super(new TestingCompleteDisplay(), new TestingCompleteController());
	}
}

class TestingCompleteController extends TaskController
{
	constructor()
	{
		super();
	}

	Submit(selectedOptions: Option): void
	{
	}

	GetOptions(): Option[]
	{
		return [];
	}
}

class TestingCompleteDisplay extends TaskDisplay
{
	Display(screen: UserInterface): void
	{
		screen.ViewModeTestsComplete();
	}
}