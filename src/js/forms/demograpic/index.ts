import {Task} from "../../tasks";
import { DemographicForm } from "./DemographicForm";
import { DemographicController } from "./DemographicController";

export class DemographicSurvey extends Task
{
	constructor()
	{
		let form = new DemographicForm(() =>
		{
			this.Controller.Submit([]);
			this.Metadata = form.GetInputData();
		});
		let controller = new DemographicController(form);

		super(form, controller);
		this.SetTitle("Screening");
	}
}