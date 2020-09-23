import { TaskLoader } from "../../tasks/TaskLoader";
import { Task } from "../../tasks";
import { ContourPlotComparison } from "./Displays/ContourPlotComparison";
import { IsocontourController } from "./IsoContourController";
import { IsocontourTutorial } from "./IsocontourTutorial";;
import { WaveGraphPoints } from "../../util/WaveGraphPoints";
import { Backend } from "../../Backend";
import { IsocontourTask } from "./IsocontourTask";
import { SerializedTask } from "../../tasks/SerializedTask";

export class IsocontourDatasetLoader extends TaskLoader
{
	private backend : Backend;
	private dataset : string;
	private axisLength : number;

	constructor(backend: Backend, datasetName : string, axisLength : number)
	{
		super();
		this.backend = backend;
		this.dataset = datasetName;
		this.axisLength = axisLength;
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
		return {
			Name : IsocontourDatasetLoader.name,
			DatasetName: this.dataset,
			Metadata: {}
		};
	}
}