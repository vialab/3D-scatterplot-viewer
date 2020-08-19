import { TaskProvider } from "../../tasks/TaskProvider";
import { Task } from "../../tasks";
import { ContourPlotComparison } from "./Displays/ContourPlotComparison";
import { IsocontourController } from "./IsoContourController";
import { IsocontourTutorial } from "./IsocontourTutorial";;
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
		let graphDisplay = new ContourPlotComparison(
			WaveGraphPoints.GeneratePoints(40, 15),
			this.axisLength
		);
		let graphTask = new IsocontourController();

		let task = new Task(graphDisplay, graphTask);
		task.SetCofidenceTracked(true);
		task.SetPrompt("Does the contour plot represent the graph shown?")

		return task;
	}
}