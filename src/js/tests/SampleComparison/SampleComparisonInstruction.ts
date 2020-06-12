import { SampleComparison } from "./SampleComparison";
import { Task, Option } from "../../tasks";
import { TaskDisplay, ImageComparison } from "../../io";

export class SampleComparisonInstruction extends Task
{
	display : ImageComparison;

	constructor(image1 : string, image2 : string)
	{
		super();

		this.SetTitle("Instructions");
		this.SetPrompt("You will be show two images like above, and will be asked whether they are equivalent.");

		this.display = new ImageComparison(
			image1,
			image2
		);
	}

	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetOptions(): Option[] {
		return [new Option(0, "Try it out")];
	}

	GetDisplay(): TaskDisplay
	{
		return this.display;
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