import { Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartDisplay } from "./PieChartDisplay";
import { PieChartData } from "./PieChartData";
import { PieChartController } from "./PieChartController";
import { SerializedTask } from "../../tasks/SerializedTask";
import { Color } from "../../ui/Color";

export class PieChart extends Task
{
	pie1 : PieChartData[];
	pie2 : PieChartData[];

	constructor(pie1 : PieChartData[], pie2 : PieChartData[])
	{
		super(new PieChartDisplay(pie1, pie2), new PieChartController(pie1, pie2));
		this.pie1 = pie1;
		this.pie2 = pie2;
		this.SetCofidenceTracked(true);
	}

	public LogResults(log: ResultLog): void
	{
	}

	public Serialize() : SerializedTask
	{
		return {
			Name: PieChart.name,
			DatasetName: "",
			Metadata: {
				pie1: this.serializeData(this.pie1),
				pie2: this.serializeData(this.pie2)
			}
		};
	}

	private serializeData(data : PieChartData[])
	{
		return JSON.stringify(data);
	}

	private deserializeData(serialized : string) : PieChartData[]
	{
		let parsedData = [];

		let data = JSON.parse(serialized);
		for (let i = 0; i < data.length; i++)
		{
			let currentData = data[i];
			let element = new PieChartData(
				currentData.Label,
				currentData.Value,
				new Color(
					currentData.Color.red,
					currentData.Color.green,
					currentData.Color.blue,
					currentData.Color.alpha
				)
			);

			parsedData.push(element);
		}

		return parsedData;
	}

	public SetValues(serialization : SerializedTask)
	{
		this.pie1 = this.deserializeData(serialization.Metadata.pie1);
		this.pie2 = this.deserializeData(serialization.Metadata.pie2);

		this.Display = new PieChartDisplay(this.pie1, this.pie2);
		this.Controller = new PieChartController(this.pie1, this.pie2);
	}
}