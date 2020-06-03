import {Task, Option, TaskResult} from "../../tasks";
import {ImageDisplay, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class SampleTest extends Task
{
	private options : Option[];

	private display : ImageDisplay;
	private timer : UnlimitedTimer;

	constructor()
	{
		super();
		this.options = [
			new Option(0, "Yes"),
			new Option(1, "No"),
			new Option(2, "Maybe so")
		];

		this.display = new ImageDisplay(
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
		);

		this.timer = new UnlimitedTimer();
	}

	SubmitOptions(selectedOptions: Option[]): void
	{
		this.Complete(new TaskResult());
	}

	GetTitle(): string
	{
		return "Sample Test 1: Select any option"
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
}