import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class VisualArtDescription extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div style="padding-top: 20px;">
			<p>
				What type of visual art do you make?<br />
				If you selected 0 hours/week in the previous question, leave this question blank
			</p>
			<textarea id="visualartdesc" rows="4" cols="50"></textarea>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#visualartdesc").val();
	}
}