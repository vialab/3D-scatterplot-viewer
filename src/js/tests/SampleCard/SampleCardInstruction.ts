import {Task, Option, TaskResult} from "../../tasks";
import {UserInterface, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class SampleCardInstruction extends Task
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
		return new SampleCardInstructionDisplay();
	}

	GetTimer(): Timer
	{
		return new UnlimitedTimer();
	}
}

class SampleCardInstructionDisplay extends TaskDisplay
{
	template : string;

	constructor()
	{
		super();
		this.template = `<p>You will be shown a 2d card</p>`
		+ `<img src="images/card.png" style="width: 75px; height: 75px;"/>`
		+ `<p>That card will be followed by a series of shapes</p>`
		+ `<div style="display: flex;">`
		+ `<img src="images/cardOpt1.png" style="flex: 1; width: 75px; height: 75px;"/>`
		+ `<img src="images/cardOpt2.png" style="flex: 1;width: 75px; height: 75px;"/>`
		+ `<img src="images/cardOpt3.png" style="flex: 1;width: 75px; height: 75px;"/>`
		+ `<img src="images/cardOpt4.png" style="flex: 1;width: 75px; height: 75px;"/>`
		+ `</div>`
		+ `<p>You will be asked to specify whether each shape is different from or the same as the original</p>`
		;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
	}
}