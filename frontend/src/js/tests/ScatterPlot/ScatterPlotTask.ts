import { TaskDisplay } from "../../io";
import { TaskController, Task } from "../../tasks";
import { Backend } from "../../Backend";
import { DatasetParser } from "../../plotData/DatasetParser";
import { ScatterPlotController } from "./ScatterPlotController";
import { ResultLog } from "../../metrics/ResultLog";

export class ScatterPlotTask extends Task
{
	public LogResults(log : ResultLog) : void
	{
	}
}