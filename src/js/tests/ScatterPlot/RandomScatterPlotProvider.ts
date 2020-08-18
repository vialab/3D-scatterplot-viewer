import { TaskProvider } from "../../tasks/TaskProvider";
import { Task } from "../../tasks";
import { ScatterPlotController } from "./ScatterPlotController";
import { InteractablePlotView } from "./InteractablePlotView";
import { IndependentAxisNormalizer } from "../../PlotData/Normalization/IndependentAxisNormalizer";
import { RandomPoints } from "../../util/RandomPoints";
import { CsvParser } from "../../PlotData/CsvParser";

import * as Iris from "../../PlotData/iris.json";
import { IsocontourTutorial } from "../Isocontour/IsocontourTutorial";

export class RandomScatterPlotProvider implements TaskProvider
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
		let axisNormalizer = new IndependentAxisNormalizer();

		let parser = new CsvParser(axisNormalizer, Iris, 13, 1000);
		let parsedData = parser.ParsePoints();
		let noise = RandomPoints.Generate(75, -0.9, 0.9);
		let points = parsedData.concat(noise);

		let controller = new ScatterPlotController();
		let display = new InteractablePlotView(points, this.axisLength-10);

		let task = new Task(display, controller);
		task.SetExplicitSubmissionRequired(true);
		task.SetCofidenceTracked(true);

		return task;
	}
}