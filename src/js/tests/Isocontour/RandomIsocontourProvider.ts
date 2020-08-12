import { TaskProvider } from "../../tasks/TaskProvider";
import { Task } from "../../tasks";
import { Point } from "../../PlotData/Point";
import { IndependentAxisNormalizer } from "../../PlotData/Normalization/IndependentAxisNormalizer";
import { RandomPoints } from "../../util/RandomPoints";
import { ContourPlaneDisplay } from "./ContourPlaneDisplay";
import { Isocontour } from "./IsoContour";

export class RandomIsocontourProvider implements TaskProvider
{
	private axisLength : number;

	constructor(axisLength : number)
	{
		this.axisLength = axisLength;
	}

	Create(): Task
	{
		let points = this.GenerateWaveGraph(40, this.axisLength, 15);
		let graphDisplay = new ContourPlaneDisplay(points, this.axisLength);
		let graphTask = new Isocontour();

		let task = new Task(graphDisplay, graphTask);
		task.SetPrompt("Does the contour plot represent the graph shown?")

		return task;
	}

	private GenerateWaveGraph(pointsPerSlice : number, dimension : number, multiplier : number=1) : Point[]
	{
		let points : Point[] = [];
		let increment = 1/pointsPerSlice;

		for (let x = 0; x <= 1; x +=increment)
		{
			for (let z = 0; z <= 1; z += increment)
			{
				let screenY = (Math.sin(x*multiplier)-Math.cos(z*multiplier))*dimension;
				let screenX = x*dimension - dimension/2;
				let screenZ = z*dimension - dimension/2;

				points.push(new Point(screenX, screenY, screenZ));
			}
		}

		return new IndependentAxisNormalizer().Normalize(points);
	}
}