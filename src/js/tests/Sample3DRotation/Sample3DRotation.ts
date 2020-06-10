import {Task, Option, TaskResult, ImageOption} from "../../tasks";
import {UserInterface, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class Sample3DRotation extends Task
{
	constructor()
	{
		super();

		this.SetCofidenceTracked(true);
		this.SetResultsTracked(false);
	}
	
	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetOptions(): Option[]
	{
		return [new ImageOption(0, "images/rotationOptions.png")];
	}

	GetDisplay(): TaskDisplay
	{
		return new SampleRotationDisplay();
	}
}

class SampleRotationDisplay extends TaskDisplay
{
	template : string;

	constructor()
	{
		super();
		this.template =
			`<img src="images/rotation1.png" />`
			+ `<img src="images/rotation2.png" />`
			;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
	}
}