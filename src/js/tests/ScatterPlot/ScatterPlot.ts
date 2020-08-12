import { Task, Option } from "../../tasks";
import { TaskDisplay } from "../../io";
import { InteractablePlotView } from "./InteractablePlotView";
import { Point } from "../../PlotData/Point";
import { TaskController } from "../../tasks/TaskController";

export class ScatterPlot extends TaskController
{
	constructor()
	{
		super();
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