import { TaskLoader } from "../../tasks/TaskLoader";
import { Task } from "../../tasks";
import { ContourPlotComparison } from "./Displays/ContourPlotComparison";
import { IsocontourController } from "./IsoContourController";
import { IsocontourTutorial } from "./IsocontourTutorial";;
import { WaveGraphPoints } from "../../util/WaveGraphPoints";
import { Backend } from "../../Backend";
import { IsocontourTask } from "./IsocontourTask";
import { SerializedTask } from "../../tasks/SerializedTask";
import { OptionButton } from "../../ui/components/OptionButton";

export class IsocontourDatasetLoader extends TaskLoader
{
	private backend : Backend;
	private dataset : string;
	private axisLength : number;

	public CreatePractice = false;

	constructor(backend: Backend, datasetName : string, axisLength : number)
	{
		super();
		this.backend = backend;
		this.dataset = datasetName;
		this.axisLength = axisLength;
	}

	async Create(): Promise<Task>
	{
		let points = WaveGraphPoints.GeneratePoints(40, 15);
		let task = new IsocontourTask(points, this.axisLength);

		task.IsPractice = this.CreatePractice;

		return task;
	}

	Serialize() : SerializedTask
	{
		return {
			Name : IsocontourDatasetLoader.name,
			DatasetName: this.dataset,
			IsPractice: this.CreatePractice,
			Metadata: {}
		};
	}
}