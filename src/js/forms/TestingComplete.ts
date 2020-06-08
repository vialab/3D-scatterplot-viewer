import { Task, Option, TaskResult } from "../tasks";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";

export class TestingComplete extends Task
{
	OptionSelected(selectedOptions: Option): void
	{
		throw new Error("Method not implemented.");
	}
	GetTitle(): string
	{
		return "";
	}
	GetPrompt(): string
	{
		return "";
	}
	GetOptions(): Option[]
	{
		return [];
	}
	GetDisplay(): TaskDisplay
	{
		return new TestingCompleteDisplay();
	}
	GetTimer(): Timer
	{
		return new UnlimitedTimer();
	}

	IsConfidenceTracked(): boolean
	{
		return false;
	}
	IsResultsTracked(): boolean
	{
		return false;
	}
}

class TestingCompleteDisplay extends TaskDisplay
{
	Display(screen: UserInterface): void
	{
		screen.ViewModeTestsComplete();
	}
}