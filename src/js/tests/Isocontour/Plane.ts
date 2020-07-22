import * as Three from "three";
import { PlotPoint } from "../ScatterPlot/PlotPoint";

export class Plane
{
	private points : PlotPoint[];
	private sortedPoints : PlotPoint[];

	constructor(points : PlotPoint[])
	{
		this.points = points;
		this.sortedPoints = [];
	}

	public GeneratePlane()
	{
	}
}