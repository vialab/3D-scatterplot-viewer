import { Task, Option, RequireOneSelectedOptionController } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { RotationView } from "./RotationView";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { SerializedTask } from "../../tasks/SerializedTask";
import { LimitedTimer } from "../../metrics";

export class RotationTask extends Task
{
	private pageNumber : number;

	constructor(pageNumber : number)
	{
		super(new RotationView(pageNumber), new RequireOneSelectedOptionController());
		this.pageNumber = pageNumber;
		this.SetCofidenceTracked(true);
		this.SetExplicitSubmissionRequired(true);
	}

	public Submit()
	{
		this.Controller.Submit((<RotationView>this.Display).GetOptions());
	}
	
	public LogResults(log: ResultLog): void
	{
	}

	public Serialize() : SerializedTask
	{
		let s = super.Serialize();
		s.Metadata = {PageNumber: this.pageNumber};
		return s;
	}

	public SetValues(task : SerializedTask)
	{
		super.SetValues(task);

		this.pageNumber = task.Metadata.PageNumber;
		this.Display = new RotationView(this.pageNumber);
	}
}