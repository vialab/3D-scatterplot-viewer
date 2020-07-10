import { Task, Option } from "../../tasks";
import { TaskDisplay } from "../../io";
import { ScatterPlotDisplay } from "./ScatterPlotDisplay";
import { PlotPoint } from "./PlotPoint";

export class ScatterPlot extends Task
{
	private points : PlotPoint[];

	constructor(points : PlotPoint[])
	{
		super();
		
		this.points = points;

		this.SetExplicitSubmissionRequired(true);
	}

	Submit(selectedOptions: Option): void
	{
	}

	SelectPlane(x : number, y : number, z : number)
	{
		
	}

	GetOptions(): Option[]
	{
		return [];
	}

	GetDisplay(): TaskDisplay
	{
		return new ScatterPlotDisplay(this.points, this.SelectPlane);
	}
}