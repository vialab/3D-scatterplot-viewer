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
				How would you rank the importance of graphical representations of information to your work?
			</p>
			<table class="w3-table" style="width: 100%;">
				<tr>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-0" value="1"/>
						<label for="workgraphics-0">Not Important</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-1" value="2"/>
						<label for="workgraphics-1">Less Important</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-2" value="3"/>
						<label for="workgraphics-2">Moderately Important</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-3" value="4"/>
						<label for="workgraphics-3">Important</label>
					</td>
					<td>
						<input type="radio" name="workgraphics" id="workgraphics-4" value="5"/>
						<label for="workgraphics-4">Very Important</label>
					</td>
				</tr>
			</table>
		</div>`
		);
	}

	public Value() : any
	{
		return $("#input[name=workgraphics]:checked").val();
	}
}