import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class WorkplaceGraphicsLikert extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>
				To what extent do you agree with the following statement?<br />
				Graphical representations of information are important to my work.
			</p>
			<table class="w3-table" style="width: 100%;">
				<tr>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-0" value="1"/>
						<label for="workgraphics-0">Strongly Disagree</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-1" value="2"/>
						<label for="workgraphics-1">Disagree</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-2" value="3"/>
						<label for="workgraphics-2">Neutral</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-3" value="4"/>
						<label for="workgraphics-3">Agree</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-4" value="5"/>
						<label for="workgraphics-4">Strongly Agree</label>
					</td>
				</tr>
			</table>
		</div>`
		);
	}

	public Value() : any
	{
		return $("input[name=workgraphics]:checked").val();
	}
}