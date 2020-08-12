import { Task } from "../../tasks";
import { IshiharaController } from "./ishiharaController";
import { IshiharaForm } from "./IshiharaForm";

export class IshiharaTest extends Task
{
	constructor()
	{
		let form = new IshiharaForm();
		let controller = new IshiharaController(form, [74, 2, 12, 7]);

		super(form, controller);
		this.SetTitle("Screening");
		this.SetExplicitSubmissionRequired(true);
	}
}