import {Task, Option, TaskResult} from "../../tasks";
import {ImageComparison, TaskDisplay} from "../../io";
import {Timer, LimitedTimer} from "../../metrics";

export class SampleTimedTest extends Task
{
	private duration : number = 5000;

	private options : Option[];

	private display : ImageComparison;
	private timer : LimitedTimer;

	constructor()
	{
		super();
		this.options = [
			new Option(0, "pick fast"),
			new Option(1, "or let time run out")
		];

		this.display = new ImageComparison(
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
		);

		this.timer = new LimitedTimer(this, this.duration);
	}

	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetTitle(): string
	{
		return "Timed test sample"
	}
	GetPrompt() : string
	{
		return "";
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