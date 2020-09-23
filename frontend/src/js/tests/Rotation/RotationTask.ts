import { Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { RotationView } from "./RotationView";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { SerializedTask } from "../../tasks/SerializedTask";

export class RotationTask extends Task
{
	private pageNumber : number;

	constructor(pageNumber : number)
	{
		super(new RotationView(pageNumber), new EmptyTaskcontroller());
		this.pageNumber = pageNumber;
		this.SetCofidenceTracked(true);
		this.SetExplicitSubmissionRequired(true);
	}

	public LogResults(log: ResultLog): void
	{
	}

	public Serialize() : SerializedTask
	{
		return {
			Name : RotationTask.name,
			DatasetName: "",
			Metadata : {PageNumber: this.pageNumber}
		};
	}

	public SetValues(task : SerializedTask)
	{
		this.pageNumber = task.Metadata.PageNumber;
		this.Display = new RotationView(this.pageNumber);
	}
}