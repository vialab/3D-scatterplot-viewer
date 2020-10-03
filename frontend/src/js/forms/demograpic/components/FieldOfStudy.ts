import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class FieldOfStudy extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>Select your primary field of study:</p>
			<select id="field">
				<option value=""></option>
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
}