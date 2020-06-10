import { Option, Task, ImageOption } from "../../tasks";
import { TaskDisplay, UserInterface } from "../../io";

export class SampleFoldInstruction extends Task
{
	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetOptions(): Option[]
	{
		return [new Option(0, "Try it out")];
	}

	GetDisplay(): TaskDisplay
	{
		return new SampleFoldInstructionForm();
	}

}

class SampleFoldInstructionForm extends TaskDisplay
{
	template : string;

	constructor()
	{
		super();
		this.template = `<p>You will be shown a piece of paper which will be folded. After at least one fold a hole will be punched in the paper</p>`
		+ `<img src="images/fold1.png" />`
		+ `<p>You will then be shown a set of papers with holes in them</p>`
		+ `<img src="images/foldOptions.png" />`
		+ `<p>Choose what the original piece of paper will look like once it is unfolded</p>`
		;
	}

	Display(screen : UserInterface) : void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
	}
}