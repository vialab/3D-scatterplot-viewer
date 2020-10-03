import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";
import { DemographicFormComponent } from "./DemographicFormComponent";

export class WorkplaceDrawingImportance extends DemographicFormComponent
{
	constructor()
	{
		super(
		`<div>
			<p>If so, how important are these drawings and sketches to your work?</p>
			<table class="w3-table" style="width: 100%;">
				<tr>
					<td>
						<input type="radio" name="drawingimportance" id="drawingimportance-0" value="1"/>
						<label for="drawingimportance-0">Not Important</label>
					</td>
					<td>
						<input type="radio" name="drawingimportance" id="drawingimportance-1" value="2"/>
						<label for="drawingimportance-1">Less Important</label>
					</td>
					<td>
						<input type="radio" name="drawingimportance" id="drawingimportance-2" value="3"/>
						<label for="drawingimportance-2">Moderately Important</label>
					</td>
					<td>
						<input type="radio" name="drawingimportance" id="drawingimportance-3" value="4"/>
						<label for="drawingimportance-3">Important</label>
					</td>
					<td>
						<input type="radio" name="drawingimportance" id="drawingimportance-4" value="5"/>
						<label for="drawingimportance-4">Very Important</label>
					</td>
				</tr>
			</table>
		</div>`
		);
	}

	public Value() : any
	{
		return $("input[name=drawingimportance]:checked").val();
	}
}