import { Dataset } from "./plotData/Dataset";
import { ResultLog } from "./metrics/ResultLog";
import { PieChartData } from "./tests/PieChart/PieChartData";
import { Color } from "./ui/Color";
import {TestOrder} from "./TestOrder";

export class Backend
{
	public async GetDataset(filename : string) : Promise<Dataset>
	{
		try
		{
			let response = await $.get(`/datasets/${filename}`);
			
			let dataset : Dataset = {
				Dimension: 0,
				Data: []
			};
			
			let reader = new LineReader(response);
		
			for (let line = reader.NextLine(); line != null; line = reader.NextLine())
			{
				let values = line.split(",");
				dataset.Dimension = values.length;

				for (let i = 0; i < dataset.Dimension; i++)
				{
					dataset.Data.push(Number.parseFloat(values[i]));
				}
			}

			return dataset;
		}
		catch (err)
		{
			console.error(err);
			alert(`Dataset "${filename}" failed to load`);
			throw err;
		}
	}

	public async IsFieldOfStudyAllowed(fieldOfStudy : number) : Promise<boolean>
	{
		let response = await $.get(`/api/IsFieldFull/${fieldOfStudy}`);
		return !<boolean>response;
	}

	public async GetScatterPlotDataset(name : string) : Promise<Dataset>
	{
		let response = await $.get(`/api/datasets/scatterplot/${name}`);
		return <Dataset>response;
	}

	public async GetIsocontourDataset(name : string) : Promise<Dataset>
	{
		let response = await $.get(`/api/datasets/isocontour/${name}`);
		return <Dataset>response;
	}

	public async GetPieChartDataset(name : string) : Promise<PieChartData[]>
	{
		return [
			new PieChartData("A", 1, new Color(215, 48, 39, 1)),
			new PieChartData("B", 1, new Color(252, 141, 89, 1)),
			new PieChartData("C", 1, new Color(254, 224, 144, 1)),
			new PieChartData("D", 1, new Color(224, 243, 248, 1)),
			new PieChartData("E", 1, new Color(145, 191, 219, 1)),
			new PieChartData("F", 1, new Color(69, 117, 180, 1))
		];
	}

	public async SubmitSession(log : ResultLog) : Promise<void>
	{
		return await $.ajax({
			type: 'POST',
			url: '/api/submit',
			contentType: 'application/json',
			data: JSON.stringify(log),
			dataType: 'json',
			processData: false,
		});
	}

	public async GetTestOrder() : Promise<TestOrder>
	{
		return await $.get("/api/testorder");
	}
}

class LineReader
{
	private text : string;
	currentIndex : number;

	constructor(text : string)
	{
		this.text = text;
		this.currentIndex = 0;
	}

	NextLine()
	{
		let line  = "";

		for (; this.currentIndex < this.text.length; this.currentIndex++)
		{
			let character = this.text.charAt(this.currentIndex);
			
			if (character == "\n")
			{
				this.currentIndex++;
				break;
			}

			line += character;
		}

		line = line.trim();

		return line.length? line : null;
	}
}