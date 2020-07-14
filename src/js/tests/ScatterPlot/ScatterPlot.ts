import { Task, Option } from "../../tasks";
import { TaskDisplay } from "../../io";
import { ScatterPlotDisplay } from "./ScatterPlotDisplay";
import { PlotPoint } from "./PlotPoint";

export class ScatterPlot extends Task
{
	constructor(points : PlotPoint[])
	{
		super();

		this.SetExplicitSubmissionRequired(true);
		this.SetDisplay(new ScatterPlotDisplay(points, this.SelectPlane));
	}

	public Submit(selectedOptions: Option): void
	{
	}

	public SelectPlane(x : number, y : number, z : number)
	{
		
	}

	public GetOptions(): Option[]
	{
		return [];
	}
}