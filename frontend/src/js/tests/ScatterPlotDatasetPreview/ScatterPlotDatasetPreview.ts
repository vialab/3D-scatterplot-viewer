import { Loader } from "three";
import { Backend } from "../../Backend";
import { ResultLog } from "../../metrics/ResultLog";
import { Point } from "../../plotData/Point";
import { Task } from "../../tasks";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { DatasetLoader } from "../../ui/components/DatasetLoader";
import { DatasetPreviewDisplay } from "./DatasetPreviewDisplay";

export class ScatterPlotDatasetPreview extends Task
{
	private loader : DatasetLoader;
	
	constructor(backend : Backend)
	{
		let loader = new DatasetLoader(backend);
		
		loader.OnLoad = (points : Point[]) => {
			let display = <DatasetPreviewDisplay>this.Display;
			display.SetPoints(points);
			display.ReDisplay();
		}

		super(new DatasetPreviewDisplay(loader), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(false);

		this.loader = loader;
	}
	
	public async Initialize()
	{
		await this.loader.Load();
	}

	public Submit(): void
	{
	}

	public LogResults(log: ResultLog): void
	{
	}
}