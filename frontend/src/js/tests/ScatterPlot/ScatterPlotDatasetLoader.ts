import { TaskLoader } from "../../tasks/TaskLoader";
import { Task } from "../../tasks";
import { ScatterPlotController } from "./ScatterPlotController";
import { InteractablePlotView } from "./InteractablePlotView";
import { IndependentAxisNormalizer } from "../../plotData/normalization/IndependentAxisNormalizer";
import { RandomPoints } from "../../util/RandomPoints";
import { DatasetParser } from "../../plotData/DatasetParser";

import { IsocontourTutorial } from "../Isocontour/IsocontourTutorial";
import { Backend } from "../../Backend";
import { ScatterPlotTask } from "./ScatterPlotTask";
import { SerializedTask } from "../../tasks/SerializedTask";

export class ScatterPlotDatasetLoader extends TaskLoader
{
	private backend : Backend;
	private dataParser : DatasetParser;
	private datasetName : string;
	private axisLength : number;

	constructor(backend : Backend, dataParser : DatasetParser, datasetName : string, axisLength : number)
	{
		super();
		
		this.backend = backend;
		this.dataParser = dataParser;
		this.datasetName = datasetName;
		this.axisLength = axisLength;
	}

	Tutorial() : Task
	{
		return new IsocontourTutorial();
	}

	async Create(): Promise<Task>
	{
		let dataset = await this.backend.GetScatterPlotDataset(this.datasetName);
		let points = this.dataParser.Parse(dataset);

		let task = new ScatterPlotTask(points, this.axisLength-10);

		return task;
	}

	public Serialize() : SerializedTask
	{
		let serialization = {
			Name : ScatterPlotDatasetLoader.name,
			DatasetName: this.datasetName,
			Metadata : {}
		};

		return serialization;
	}
}