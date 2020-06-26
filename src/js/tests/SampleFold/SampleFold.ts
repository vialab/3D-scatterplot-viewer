import { Option, Task, ImageOption } from "../../tasks";
import { TaskDisplay, UserInterface } from "../../io";

export class SampleFold extends Task
{
	constructor()
	{
		super();
		this.SetCofidenceTracked(true);
		this.SetPrompt("Select an option:");
	}

	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetOptions(): Option[]
	{
		return [new ImageOption(0, "images/foldOptions.png")];
	}

	GetDisplay(): TaskDisplay
	{
		return new FoldDisplay();
	}
	
}

class FoldDisplay extends TaskDisplay
{
	template: string;

	constructor()
	{
		super();
		this.template = `<img src="images/fold1.png" />`;
	}

	Display(screen : UserInterface) : void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
	}
}