import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";

export class VideoGameTypes implements FormElement
{
	element : JQuery<HTMLElement>;

	constructor()
	{
		this.element = $(
		`<div style="padding-top: 20px;">
			<p>
				What types of video games do you play?<br />
				If you selected 0 h/week in the previous question, leave this question blank.
			</p>
			<textarea id="videogamesdesc" rows="4" cols="50"></textarea>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#videogamesdesc").val();
	}

	public Element(): JQuery<HTMLElement>
	{
		return this.element;
	}
}