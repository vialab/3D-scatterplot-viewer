import { Task, Option } from "../../tasks";
import { IshiharaController } from "./ishiharaController";
import { IshiharaForm } from "./IshiharaForm";
import { ResultLog } from "../../metrics/ResultLog";
import { SerializedTask } from "../../tasks/SerializedTask";
import { LimitedTimer } from "../../metrics";

export class IshiharaTask extends Task
{
	constructor()
	{
		let form = new IshiharaForm();
		let controller = new IshiharaController(form, [74, 2, 12, 7]);

		super(form, controller);
		this.SetTitle("Screening");
		this.SetCofidenceTracked(false);
		this.SetExplicitSubmissionRequired(true);
	}

	public Submit()
	{
		this.Controller.Submit([]);
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
		let s = super.Serialize();
		s.Metadata = {
			isCorrect: this.IsCorrect()
		};
		return s;
	}

	public SetValues(serialization : SerializedTask) : void
	{
		super.SetValues(serialization);
		this.SetCorrect(serialization.Metadata.isCorrect);
	}
}