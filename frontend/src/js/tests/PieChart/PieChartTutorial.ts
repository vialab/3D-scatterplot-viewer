import { Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartTutorialDisplay } from "./PieChartTutorialDisplay";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";

export class PieChartTutorial extends Task
{
	constructor()
	{
		super(new PieChartTutorialDisplay(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public LogResults(log: ResultLog): void
	{
	}
}