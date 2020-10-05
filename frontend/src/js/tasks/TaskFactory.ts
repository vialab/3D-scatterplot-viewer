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
import { DemographicExclusion } from "../forms/exclusion";
import { ScatterPlotTutorial } from "../tests/ScatterPlot/ScatterPlotTutorial";
import { IsocontourTutorial } from "../tests/Isocontour/IsocontourTutorial";
import { IsocontourTask } from "../tests/Isocontour/IsocontourTask";
import { PieChart } from "../tests/PieChart/PieChart";
import { PieChartTutorial } from "../tests/PieChart/PieChartTutorial";
import { RotationTask } from "../tests/Rotation/RotationTask";
import { RotationTutorial } from "../tests/Rotation/RotationTutorial";
import { IsocontourDatasetLoader } from "../tests/Isocontour/IsocontourDatasetLoader";
import { ElementSizeSettings } from "../ui/ElementSizeSettings";

export class TaskFactory
{
	backend : Backend;
	resultLog : ResultLog;
	elementSizing : ElementSizeSettings;

	constructor(backend : Backend, resultLog : ResultLog, elementSizing : ElementSizeSettings)
	{
		this.backend = backend;
		this.resultLog = resultLog;
		this.elementSizing = elementSizing;
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
		else if (task.Name == DemographicExclusion.name)
		{
			result = new DemographicExclusion(this.backend, new DemographicTask(), new IshiharaTask());
			result.SetValues(task);
		}
		else if (task.Name == RotationTutorial.name)
		{
			result = new RotationTutorial();
		}
		else if (task.Name == RotationTask.name)
		{
			result = new RotationTask(0);
			result.SetValues(task);
		}
		else if (task.Name == PieChartTutorial.name)
		{
			result = new PieChartTutorial();
		}
		else if (task.Name == PieChart.name)
		{
			result = new PieChart([], []);
			result.SetValues(task);
		}
		else if (task.Name == ScatterPlotTutorial.name)
		{
			result = new ScatterPlotTutorial();
		}
		else if (task.Name == ScatterPlotDatasetLoader.name)
		{
			result = new ScatterPlotDatasetLoader(
				this.backend,
				new DatasetParser(
					new IndependentAxisNormalizer()
				),
				task.DatasetName,
				this.elementSizing.CanvasSideLength()
			);
		}
		else if (task.Name == IsocontourTutorial.name)
		{
			result = new IsocontourTutorial();
		}
		else if (task.Name == IsocontourDatasetLoader.name)
		{
			result = new IsocontourDatasetLoader(
				this.backend,
				task.DatasetName,
				this.elementSizing.CanvasSideLength()
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