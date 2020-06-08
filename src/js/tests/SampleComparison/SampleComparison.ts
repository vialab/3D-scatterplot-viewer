import {Task, Option, TaskResult} from "../../tasks";
import {ImageComparison, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class SampleComparison extends Task
{
	private options : Option[];

	private display : ImageComparison;
	private timer : UnlimitedTimer;

	constructor(image1 : string, image2 : string)
	{
		super();
		this.options = [
			new Option(0, "Yes"),
			new Option(1, "No")
		];

		this.display = new ImageComparison(
			image1,
			image2
		);

		this.timer = new UnlimitedTimer();
	}

	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetTitle(): string
	{
		return ""
	}
	GetPrompt() : string
	{
		return "Are they the same?";
	}
	GetOptions(): Option[]
	{
		return this.options;
	}
	GetDuration(): number
	{
		return 0;
	}

	GetDisplay(): TaskDisplay
	{
		return this.display;
	}

	GetTimer() : Timer
	{
		return this.timer;
	}

	IsConfidenceTracked(): boolean
	{
		return true;
	}
	IsResultsTracked(): boolean
	{
		return false;
	}
}