import { TaskProvider } from "../../tasks/TaskProvider";
import { Task } from "../../tasks";
import { ScatterPlot } from "./ScatterPlot";
import { InteractablePlotView } from "./InteractablePlotView";
import { IndependentAxisNormalizer } from "../../PlotData/Normalization/IndependentAxisNormalizer";
import { RandomPoints } from "../../util/RandomPoints";
import { CsvParser } from "../../PlotData/CsvParser";

import * as Iris from "../../PlotData/iris.json";

export class RandomScatterPlotProvider implements TaskProvider
{
	private axisLength : number;

	constructor(axisLength : number)
	{
		this.axisLength = axisLength;
	}

	Create(): Task
	{
		let axisNormalizer = new IndependentAxisNormalizer();

		let parser = new CsvParser(axisNormalizer, Iris, 13, 1000);
		let parsedData = parser.ParsePoints();
		let noise = RandomPoints.Generate(75, -0.9, 0.9);
		let points = parsedData.concat(noise);

		let controller = new ScatterPlot();
		let display = new InteractablePlotView(points, this.axisLength-10);
		let task = new Task(display, controller);

		return task;
	}
}