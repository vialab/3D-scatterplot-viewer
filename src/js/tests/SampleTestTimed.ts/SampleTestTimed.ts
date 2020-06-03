import {Task, Option, TaskResult} from "../../tasks";
import {ImageDisplay, TaskDisplay} from "../../io";
import {Timer, LimitedTimer} from "../../metrics";

export class SampleTestTimed extends Task
{
	private duration : number = 5000;

	private options : Option[];

	private display : ImageDisplay;
	private timer : LimitedTimer;

	constructor()
	{
		super();
		this.options = [
			new Option(0, "pick fast"),
			new Option(1, "or let time run out")
		];

		this.display = new ImageDisplay(
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
		);

		this.timer = new LimitedTimer(this, this.duration);
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