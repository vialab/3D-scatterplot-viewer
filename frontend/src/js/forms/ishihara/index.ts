import { Task } from "../../tasks";
import { IshiharaController } from "./ishiharaController";
import { IshiharaForm } from "./IshiharaForm";
import { ResultLog } from "../../metrics/ResultLog";
import { SerializedTask } from "../../tasks/SerializedTask";

export class IshiharaTask extends Task
{
	constructor()
	{
		let form = new IshiharaForm();
		let controller = new IshiharaController(form, [74, 2, 12, 7]);

		super(form, controller);
		this.SetTitle("Screening");
		this.SetCofidenceTracked(true);
		this.SetExplicitSubmissionRequired(true);
	}

	public IsCorrect() : boolean
	{
		return (<IshiharaController>this.Controller).IsCorrect;
	}

	protected SetCorrect(isCorrect : boolean)
	{
		(<IshiharaController>this.Controller).IsCorrect = isCorrect;
	}

	public LogResults(log : ResultLog) : void
	{
	}

	public Serialize() : SerializedTask
	{
		return {
			Name: IshiharaTask.name,
			DatasetName: "",
			Metadata: {
				isCorrect: this.IsCorrect()
			}
		}
	}

	public SetValues(serialization : SerializedTask) : void
	{
		this.SetCorrect(serialization.Metadata.isCorrect);
	}
}