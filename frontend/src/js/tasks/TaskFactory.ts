import { SerializedTask } from "./SerializedTask";
import { Task, TaskLoader } from ".";
import { Backend } from "../Backend";
import { ScatterPlotDatasetLoader } from "../tests/ScatterPlot/ScatterPlotDatasetLoader";
import { DatasetParser } from "../plotData/DatasetParser";
import { IndependentAxisNormalizer } from "../plotData/normalization/IndependentAxisNormalizer";
import { DemographicTask } from "../forms/demograpic";
import { IshiharaTask } from "../forms/ishihara";
import { TestingComplete } from "../forms/TestingComplete";
import { ResultLog } from "../metrics/ResultLog";

export class TaskFactory
{
	backend : Backend;
	resultLog : ResultLog;

	constructor(backend : Backend, resultLog : ResultLog)
	{
		this.backend = backend;
		this.resultLog = resultLog;
	}

	Create(task : SerializedTask) : Task | TaskLoader
	{
		let result : Task | TaskLoader | null = null;

		if (task.Name == DemographicTask.name)
		{
			result = new DemographicTask();
			result.SetValues(task);
		}
		else if (task.Name == IshiharaTask.name)
		{
			result = new IshiharaTask();
			result.SetValues(task);
		}
		else if (task.Name == ScatterPlotDatasetLoader.name)
		{
			result = new ScatterPlotDatasetLoader(
				this.backend,
				new DatasetParser(
					new IndependentAxisNormalizer()
				),
				task.DatasetName,
				task.Metadata.AxisLength
			);
		}
		else if (task.Name == TestingComplete.name)
		{
			result = new TestingComplete(this.backend, this.resultLog);
		}

		if (result == null)
			throw new Error(`No matching task name found: "${task.Name}"`);
		else
			return result;
	}
}