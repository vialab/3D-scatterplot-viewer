import { Task, Option } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { PieChartDisplay } from "./PieChartDisplay";
import { PieChartData } from "./PieChartData";
import { PieChartController } from "./PieChartController";
import { SerializedTask } from "../../tasks/SerializedTask";
import { Color } from "../../ui/Color";
import { OptionButton } from "../../ui/components/OptionButton";
import { LimitedTimer } from "../../metrics";

export class PieChart extends Task
{
	pie1 : PieChartData[];
	pie2 : PieChartData[];
	options : OptionButton[];

	constructor(pie1 : PieChartData[], pie2 : PieChartData[])
	{
		let options = [
			new OptionButton(0, "Yes", 0),
			new OptionButton(1, "No", 0)
		];

		for (let i = 0; i < options.length; i++)
			options[i].OnStateChanged = () => this.Submit()

		super(
			new PieChartDisplay(
				pie1,
				pie2,
				options
			),
			new PieChartController(pie1, pie2)
		);

		this.pie1 = pie1;
		this.pie2 = pie2;
		this.SetCofidenceTracked(true);

		this.options = options;

		this.SetTimer(new LimitedTimer(this, 600000));
	}

	public Submit()
	{
		this.Controller.Submit(this.options);
	}

	public LogResults(log: ResultLog): void
	{
	}

	public Serialize() : SerializedTask
	{
		let serialized = super.Serialize();
		serialized.Metadata = {
			pie1: this.serializeData(this.pie1),
			pie2: this.serializeData(this.pie2)
		};
		return serialized;
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
		super.SetValues(serialization);
		
		this.pie1 = this.deserializeData(serialization.Metadata.pie1);
		this.pie2 = this.deserializeData(serialization.Metadata.pie2);

		this.Display = new PieChartDisplay(
			this.pie1,
			this.pie2,
			this.options
		);
		this.Controller = new PieChartController(this.pie1, this.pie2);
	}
}