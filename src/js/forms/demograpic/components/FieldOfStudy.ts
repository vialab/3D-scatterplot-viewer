import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";

export class FieldOfStudy implements FormElement
{
	element : JQuery<HTMLElement>;

	constructor()
	{
		this.element = $(
		`<div>
			<p>Select your primary field of study:</p>
			<select id="field">
				<option value="1">Computer Science</option>
				<option value="2">Chemistry</option>
				<option value="3">Education</option>
				<option value="4">Other</option>
			</select>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#field option:selected").val();
	}

	public Element(): JQuery<HTMLElement>
	{
		return this.element;
	}
}