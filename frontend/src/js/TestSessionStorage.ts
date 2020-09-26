import { TaskList, TaskFactory, Task } from "./tasks";
import { ResultLog } from "./metrics/ResultLog";
import { Backend } from "./Backend";
import { TaskLoader } from "./tasks/TaskLoader";
import { DemographicTask } from "./forms/demograpic";
import { IshiharaTask } from "./forms/ishihara";
import { DemographicExclusion } from "./forms/exclusion";
import { TestingComplete } from "./forms/TestingComplete";

export abstract class TestSessionStorage
{
	abstract Load() : Promise<TaskList>;
	abstract Save(list : TaskList) : void;	
	abstract Clear() : void;
}

export abstract class ResultStorage
{
	abstract Load() : Promise<ResultLog>;
	abstract Save(list : ResultLog) : void;
	abstract Clear() : void;
}

const TASK_LIST_KEY = "tasklist";
const RESULT_KEY = "results";

export class NewResult extends ResultStorage
{
	async Load(): Promise<ResultLog>
	{
		let log = new ResultLog();

		log.Screen.Width = window.screen.width;
		log.Screen.Height = window.screen.height;
		log.Screen.Dpi = 0;

		console.log("Screen settings loaded into results (DPI unreadable): ", log.Screen);

		return log;
	}

	Save(list: ResultLog): void
	{
		SaveLocal(list);
	}

	Clear(): void
	{
		clearResult();
	}
	
}

export class SavedResult extends ResultStorage
{
	async Load(): Promise<ResultLog>
	{
		return JSON.parse(<string>window.localStorage.getItem(RESULT_KEY));
	}

	Save(list: ResultLog): void
	{
		SaveLocal(list);
	}

	Clear(): void
	{
		clearResult();
	}

	static IsLocalResultSaved()
	{
		return window.localStorage.getItem(RESULT_KEY) != null;
	}
}

export class NewSession extends TestSessionStorage
{
	taskFactory : TaskFactory;
	backend : Backend;
	resultLog : ResultLog;

	constructor(factory : TaskFactory, backend : Backend, resultLog : ResultLog)
	{
		super();
		this.taskFactory = factory;
		this.backend = backend;
		this.resultLog = resultLog;
	}

	async Load(): Promise<TaskList>
	{
		let demographicSurvey = new DemographicTask();
		let ishiharaTest = new IshiharaTask();
		let demographicEvaluation = new DemographicExclusion(this.backend, demographicSurvey, ishiharaTest);

		let taskOrder = await this.backend.GetTestOrder();

		let tasks : (Task | TaskLoader)[] = [
			demographicSurvey,
			ishiharaTest,
			demographicEvaluation
		];

		for (let i = 0; i < taskOrder.Tests.length; i++)
		{
			let serialization = taskOrder.Tests[i];
			let task = this.taskFactory.Create(serialization);
			tasks.push(task);
		}

		this.resultLog.TaskOrderName = taskOrder.Name;
		tasks.push(new TestingComplete(this.backend, this.resultLog));

		console.log("Loaded tasks. Order schema: " + taskOrder.Name);

		let taskList = new TaskList(tasks);
		return taskList;
	}

	Save(list: TaskList)
	{
		SaveLocal(list);
	}

	Clear() : void
	{
		clearTasks();
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

	async Load(): Promise<TaskList>
	{
		let serializedListJson = window.localStorage.getItem(TASK_LIST_KEY);

		if (serializedListJson == null)
			throw new Error("No task list is saved in LocalStorage");

		let serializedList = JSON.parse(<string>serializedListJson);
		let taskList = TaskList.Deserialize(serializedList, this.factory);

		return taskList;
	}

	Save(list: TaskList)
	{
		SaveLocal(list);
	}

	Clear() : void
	{
		clearTasks();
	}

	static IsLocalSessionSaved() : boolean
	{
		return window.localStorage.getItem(TASK_LIST_KEY) != null;
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

function clearTasks()
{
	window.localStorage.removeItem(TASK_LIST_KEY);
}

function clearResult()
{
	window.localStorage.removeItem(RESULT_KEY);
}