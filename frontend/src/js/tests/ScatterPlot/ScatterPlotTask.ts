import { TaskDisplay } from "../../io";
import { TaskController, Task } from "../../tasks";
import { Backend } from "../../Backend";
import { DatasetParser } from "../../plotData/DatasetParser";
import { ScatterPlotController } from "./ScatterPlotController";
import { ResultLog } from "../../metrics/ResultLog";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";

export class ScatterPlotTask extends Task
{
	constructor(display : TaskDisplay)
	{
		super(display, new EmptyTaskcontroller());

		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(true);
	}

	public LogResults(log : ResultLog) : void
	{
	}
}