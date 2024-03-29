import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class VideoGameTypes extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div style="padding-top: 20px;">
			<p>
				What types of video games do you play?<br />
				If you selected 0 hours /week in the previous question, leave this question blank
			</p>
			<textarea id="videogamesdesc" rows="4" cols="50"></textarea>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#videogamesdesc").val();
	}
}