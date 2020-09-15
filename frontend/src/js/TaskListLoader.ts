import { TaskList, TaskFactory, Task } from "./tasks";
import { ResultLog } from "./metrics/ResultLog";
import { Backend } from "./Backend";
import { SerializedTask } from "./tasks/SerializedTask";
import { TaskLoader } from "./tasks/TaskLoader";
import { IndependentAxisNormalizer } from "./plotData/normalization/IndependentAxisNormalizer";
import { DemographicTask } from "./forms/demograpic";
import { DatasetParser } from "./plotData/DatasetParser";
import { IshiharaTask } from "./forms/ishihara";
import { DemographicExclusion } from "./forms/exclusion";
import { ScatterPlotDatasetLoader } from "./tests/ScatterPlot/ScatterPlotDatasetLoader";
import { TestingComplete } from "./forms/TestingComplete";

export abstract class TestSessionStorage
{
	abstract LoadList() : Promise<TaskList>;
	abstract LoadResults() : Promise<ResultLog>;
	abstract Save(list : TaskList) : void;
	abstract Save(list : ResultLog) : void;
	abstract Clear() : void;
}

let GRAPH_AXIS_LENGTH = 450;
const TASK_LIST_KEY = "tasklist";
const RESULT_KEY = "results";

export class NewSession extends TestSessionStorage
{
	backend : Backend;
	resultLog : ResultLog;

	constructor(backend : Backend, resultLog : ResultLog)
	{
		super();
		this.backend = backend;
		this.resultLog = resultLog;
	}

	async LoadList(): Promise<TaskList>
	{
		let defaultParser = new DatasetParser(new IndependentAxisNormalizer());

		let demographicSurvey = new DemographicTask();
		let ishiharaTest = new IshiharaTask();
		let demographicEvaluation = new DemographicExclusion(this.backend, demographicSurvey, ishiharaTest);

		// let contour = new RandomIsocontourProvider(backend, EXAMPLE_PLANE_AXIS_LENGTH);
		let ScatterPlot = new ScatterPlotDatasetLoader(this.backend, defaultParser, "iris", GRAPH_AXIS_LENGTH);

		let tasks = new TaskList([
			demographicSurvey,
			ishiharaTest,
			demographicEvaluation,

			ScatterPlot,

			new TestingComplete(this.backend, this.resultLog)
		]);

		return tasks
	}
	async LoadResults(): Promise<ResultLog>
	{
		return new ResultLog();
	}

	Save(list: TaskList): void;
	Save(list: ResultLog): void;
	Save(list: any)
	{
		SaveLocal(list);
	}

	Clear() : void
	{
		window.localStorage.clear();
	}
}

export class SavedSession extends TestSessionStorage
{
	factory : TaskFactory;

	constructor(factory : TaskFactory)
	{
		super();
		this.factory = factory;
	}

	async LoadList(): Promise<TaskList>
	{
		let serializedListJson = window.localStorage.getItem(TASK_LIST_KEY);

		if (serializedListJson == null)
			throw new Error("No task list is saved in LocalStorage");

		let serializedList = JSON.parse(<string>serializedListJson);
		let taskList = TaskList.Deserialize(serializedList, this.factory);

		return taskList;
	}

	async LoadResults(): Promise<ResultLog>
	{
		return JSON.parse(<string>window.localStorage.getItem(RESULT_KEY));
	}

	Save(list: TaskList): void;
	Save(list: ResultLog): void;
	Save(list: any)
	{
		SaveLocal(list);
	}

	Clear() : void
	{
		window.localStorage.clear();
	}

	static IsLocalSessionSaved() : boolean
	{
		return window.localStorage.getItem(TASK_LIST_KEY) != null
			&& window.localStorage.getItem(RESULT_KEY) != null
			;
	}
}

function SaveLocal(obj : TaskList | ResultLog)
{
	if (obj instanceof TaskList)
	{
		let serialization = obj.Serialize();
		window.localStorage.setItem(TASK_LIST_KEY, JSON.stringify(serialization));
	}
	else
	{
		window.localStorage.setItem(RESULT_KEY, JSON.stringify(obj));
	}
}