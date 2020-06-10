import {Task, Option, TaskResult} from "../../tasks";
import {UserInterface, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class Sample3DInstruction extends Task
{
	constructor()
	{
		super();
		this.SetTitle("Instructions");
	}

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
		return new SampleRotationInstructionDisplay();
	}

	GetTimer(): Timer
	{
		return new UnlimitedTimer();
	}
}

class SampleRotationInstructionDisplay extends TaskDisplay
{
	template : string;

	constructor()
	{
		super();
		this.template = `<p>You will be shown an image of a 3d object which has been rotated</p>`
		+ `<img src="images/rotation1.png" />`
		+ `<p>You will then be shown another 3d object, and a set of rotated versions of that object</p>`
		+ `<img src="images/rotation2.png" />`
		+ `<img src="images/rotationOptions.png" />`
		+ `<p>choose the image that represents an equivalent roation from the first object on the second one</p>`
		;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
	}
}