import * as Three from "three";
import { Point } from "../../PlotData/Point";

export class Plane
{
	private points : Point[];
	private sortedPoints : Point[];

	constructor(points : Point[])
	{
		this.points = points;
		this.sortedPoints = [];
	}

	public GeneratePlane()
	{
	}
}