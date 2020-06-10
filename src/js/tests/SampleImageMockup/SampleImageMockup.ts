import {Task, Option, TaskResult, ImageOption} from "../../tasks";
import {UserInterface, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class SampleImageMockup extends Task
{
	src : string;

	constructor(imagesrc : string)
	{
		super();
		this.src = imagesrc;
	}

	OptionSelected(selectedOptions: Option): void
	{
	}

	GetOptions(): Option[]
	{
		return [];
	}
	GetDisplay(): TaskDisplay
	{
		return new ImageDisplay(this.src);
	}
}

class ImageDisplay extends TaskDisplay
{
	template : string;

	constructor(imagesrc : string)
	{
		super();
		this.template = `<img src="${imagesrc}" alt="Failed to load image" />`;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
	}
}