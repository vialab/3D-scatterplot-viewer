import { Task, Option } from "../../tasks";
import { TaskDisplay } from "../../io";
import { InteractablePlotView } from "./InteractablePlotView";
import { PlotPoint } from "./PlotPoint";

export class ScatterPlot extends Task
{
	constructor()
	{
		super();
		this.SetExplicitSubmissionRequired(true);
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