import { Backend } from "./Backend";
import { TaskList } from "./tasks";
import { ScatterPlotDatasetPreview } from "./tests/ScatterPlotDatasetPreview/ScatterPlotDatasetPreview";
import { TestSessionStorage } from "./TestSessionStorage";

export class PreviewSession extends TestSessionStorage
{
	private backend : Backend;

	constructor(backend : Backend)
	{
		super();

		this.backend = backend;
	}

	async Load(): Promise<TaskList>
	{
		return new TaskList([
			new ScatterPlotDatasetPreview(this.backend)
		]);
	}

	Save(list: TaskList): void
	{
	}
	Clear(): void
	{
	}
	
}