import { Task, Option } from "../../../tasks";
import { TaskDisplay, ImageComparisonInstructionDisplay } from "../../../io";

export class SampleComparisonInstruction extends Task
{
	display : ImageComparisonInstructionDisplay;


	constructor(image1 : string, image2 : string)
	{
		super();

		this.display = new ImageComparisonInstructionDisplay(
			image1,
			image2
		);

		this.SetTitle("Instructions");
		super.SetPrompt("");
		this.SetPrompt("You will be show two images like above, and will be asked whether they are equivalent.");
	}

	SetPrompt(prompt : string)
	{
		this.display.prompt = prompt;
	}

	//Hacky way for the current display to not display the prompt
	GetPrompt() : string
	{
		return "";
	}

	Submit(selectedOptions: Option): void
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