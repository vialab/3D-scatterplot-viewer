import {Task, Option, TaskResult} from "../../tasks";
import {ImageComparison, TaskDisplay} from "../../io";
import {Timer, LimitedTimer} from "../../metrics";

export class SampleTimedTest extends Task
{
	private duration : number = 5000;

	private options : Option[];
	private display : ImageComparison;

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
		
		this.SetTitle("Timed test sample");
		this.SetTimer(new LimitedTimer(this, this.duration));
		this.SetCofidenceTracked(true);
		this.SetResultsTracked(false);
	}

	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}
	GetOptions(): Option[]
	{
		return this.options;
	}

	GetDisplay(): TaskDisplay
	{
		return this.display;
	}
}