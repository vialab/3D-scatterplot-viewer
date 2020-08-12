import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";

export class WorkplaceDrawingUsed implements FormElement
{
	element : JQuery<HTMLElement>;

	constructor()
	{
		this.element = $(
		`<div>
			<p>Do you make drawings or sketches for your work?</p>
			<input type="radio" name="drawing" id="drawing-1" value="1">
			<label for="drawing-1">Yes</label>
			<br />
			<input type="radio" name="drawing" id="drawing-2" value="0">
			<label for="drawing-2">No</label>
		</div>`
		);
	}

	public Value() : any
	{
		return $("input[name=drawing]").val() == "1";
	}

	public Element(): JQuery<HTMLElement>
	{
		return this.element;
	}
}