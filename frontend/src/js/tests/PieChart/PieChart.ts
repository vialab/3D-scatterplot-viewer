import { Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartDisplay } from "./PieChartDisplay";
import { PieChartData } from "./PieChartData";
import { PieChartController } from "./PieChartController";

export class PieChart extends Task
{
	constructor(pie1 : PieChartData[], pie2 : PieChartData[])
	{
		super(new PieChartDisplay(pie1, pie2), new PieChartController(pie1, pie2));
		this.SetCofidenceTracked(true);
	}

	public LogResults(log: ResultLog): void
	{
	}
}