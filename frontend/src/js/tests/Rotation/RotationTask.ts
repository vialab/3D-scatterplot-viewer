import { Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { RotationView } from "./RotationView";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";

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
}