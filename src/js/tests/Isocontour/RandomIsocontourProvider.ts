import { TaskProvider } from "../../tasks/TaskProvider";
import { Task } from "../../tasks";
import { Point } from "../../PlotData/Point";
import { IndependentAxisNormalizer } from "../../PlotData/Normalization/IndependentAxisNormalizer";
import { RandomPoints } from "../../util/RandomPoints";
import { ContourPlaneDisplay } from "./ContourPlaneDisplay";
import { Isocontour } from "./IsoContour";
import { WaveGraphDisplay } from "./WaveGraph";
import { IsocontourTutorial } from "./IsocontourTutorial";
import { HeatmapPlaneDisplay } from "./HeatmapPlaneDisplay";
import { WaveGraphPoints } from "../../util/WaveGraphPoints";

export class RandomIsocontourProvider implements TaskProvider
{
	private axisLength : number;

	constructor(axisLength : number)
	{
		this.axisLength = axisLength;
	}

	Tutorial() : Task
	{
		return new IsocontourTutorial();
	}

	Create(): Task
	{
		let graphDisplay = new ContourPlaneDisplay(
			WaveGraphPoints.GeneratePoints(40, 15),
			this.axisLength
		);
		let graphTask = new Isocontour();

		let task = new Task(graphDisplay, graphTask);
		task.SetCofidenceTracked(true);
		task.SetPrompt("Does the contour plot represent the graph shown?")

		return task;
	}
}