import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";

export class WorkplaceGraphicsDescription implements FormElement
{
	element : JQuery<HTMLElement>;

	constructor()
	{
		this.element = $(
		`<div>
			<p>Please describe what graphical representations of information you use for your work.</p>
			<textarea id="workplaceGraphicsDescription" rows="4" cols="50"></textarea>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#workplaceGraphicsDescription").val();
	}

	public Element(): JQuery<HTMLElement>
	{
		return this.element;
	}
}