import { Dataset } from "./plotData/Dataset";
import { ResultLog } from "./metrics/ResultLog";

export class Backend
{
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

	public async GetPieChartDataset(name : string) : Promise<Dataset>
	{
		let response = await $.get(`/api/datasets/piechart/${name}`);
		return <Dataset>response;
	}

	public async GetIsocontourDataset(name : string) : Promise<Dataset>
	{
		let response = await $.get(`/api/datasets/isocontour/${name}`);
		return <Dataset>response;
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
}