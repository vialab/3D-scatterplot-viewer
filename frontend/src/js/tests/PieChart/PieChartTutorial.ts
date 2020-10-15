import { Task, Option } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartTutorialDisplay } from "./PieChartTutorialDisplay";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { SerializedTask } from "../../tasks/SerializedTask";

export class PieChartTutorial extends Task
{
	constructor()
	{
		super(new PieChartTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("Pie Chart Instructions");
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public LogResults(log: ResultLog): void
	{
	}
	
	public Submit()
	{
		this.Controller.Submit([]);
	}


	public Serialize() : SerializedTask
	{
		return {
			Name : PieChartTutorial.name,
			DatasetName: "",
			Metadata : {}
		};
	}
}