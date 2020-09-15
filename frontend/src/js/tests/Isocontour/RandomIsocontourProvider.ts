import { TaskLoader } from "../../tasks/TaskLoader";
import { Task } from "../../tasks";
import { ContourPlotComparison } from "./Displays/ContourPlotComparison";
import { IsocontourController } from "./IsoContourController";
import { IsocontourTutorial } from "./IsocontourTutorial";;
import { WaveGraphPoints } from "../../util/WaveGraphPoints";
import { Backend } from "../../Backend";
import { IsocontourTask } from "./IsocontourTask";
import { SerializedTask } from "../../tasks/SerializedTask";

export class RandomIsocontourProvider implements TaskLoader
{
	private backend : Backend;
	private axisLength : number;

	constructor(backend: Backend, axisLength : number)
	{
		this.backend = backend;
		this.axisLength = axisLength;
	}

	Tutorial() : Task
	{
		return new IsocontourTutorial();
	}

	async Create(): Promise<Task>
	{
		// let points = this.backend.GetIsocontourDataset(datasetName);

		let graphDisplay = new ContourPlotComparison(
			WaveGraphPoints.GeneratePoints(40, 15),
			// points,
			this.axisLength
		);
		let graphTask = new IsocontourController();

		let task = new IsocontourTask(graphDisplay, graphTask);
		task.SetCofidenceTracked(true);
		task.SetPrompt("Does the contour plot represent the graph shown?")

		return task;
	}

	Serialize() : SerializedTask
	{
		throw new Error("Not yet implemented");
	}
}