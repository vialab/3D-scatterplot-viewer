import {Task, Option, TaskResult} from "../../tasks";
import {ImageComparison, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class SampleComparison extends Task
{
	private options : Option[];

	private display : ImageComparison;

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

		this.SetPrompt("Are they the same?");
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