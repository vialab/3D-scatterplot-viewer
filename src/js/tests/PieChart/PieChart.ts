import {Task, Option} from "../../tasks";
import { TaskDisplay } from "../../io";
import { PieChartData } from "./PieChartData";
import { PieChartDisplay } from "./PieChartDisplay";
import { TaskController } from "../../tasks/TaskController";

export class PieChart extends TaskController
{
	originalData : PieChartData[];
	compareData : PieChartData[];

	constructor(originalData : PieChartData[], compareData : PieChartData[])
	{
		if (originalData.length == 0 || compareData.length == 0)
		{
			throw new Error("Cannot pass empty pie chart data");
		}

		super();
		
		this.originalData = originalData;
		this.compareData = compareData;
	}

	Submit(selectedOptions: Option): void
	{
		this.Complete();
	}

	GetOptions(): Option[]
	{
		return [new Option(0, "Yes",), new Option(1, "No")];
	}
}

