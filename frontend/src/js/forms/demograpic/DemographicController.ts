import { TaskController, Option } from "../../tasks";
import { DemographicForm } from "./DemographicForm";

export class DemographicController extends TaskController
{
	private form : DemographicForm;

	constructor(form : DemographicForm)
	{
		super();
		this.form = form;
	}

	public Submit(selectedOptions: Option | Option[]): void
	{
		let inputs = this.form.GetInputData();
		console.log(inputs);
		this.Complete();
		//Validate:
		//degree list
		//at least abchelors
		//graphic likert
		//drawings used
		//drawings importance (if drawings used)
		//time spent making art
		//time spent playing games
		//age (filled out, numeric, within range?)
		//gender filled out
	}

	public GetOptions(): Option[]
	{
		return [];
	}
}