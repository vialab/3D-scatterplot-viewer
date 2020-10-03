import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class EducationAtLeastBachelors extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>
				Does your education history include the completion of a bachelors' degree or higher?
			</p>
			<p>
				<input type="radio" name="bachelors" id="bachelors-1" value="1">
				<label for="bachelors-1">Yes</label>
				<br />
				<input type="radio" name="bachelors" id="bachelors-2" value="0">
				<label for="bachelors-2">No</label>
			</p>
		</div>`
		);
	}

	public Value() : any
	{
		return $("input[name=bachelors]:checked").val() == "1";
	}
}