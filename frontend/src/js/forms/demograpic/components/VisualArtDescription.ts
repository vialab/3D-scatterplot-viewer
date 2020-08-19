import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";

export class VisualArtDescription implements FormElement
{
	element : JQuery<HTMLElement>;

	constructor()
	{
		this.element = $(
		`<div style="padding-top: 20px;">
			<p>
				What type of visual art do you make?<br />
				If you selected 0 h/week in the previous question, leave this question blank.
			</p>
			<textarea id="visualartdesc" rows="4" cols="50"></textarea>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#visualartdesc").val();
	}

	public Element(): JQuery<HTMLElement>
	{
		return this.element;
	}
}