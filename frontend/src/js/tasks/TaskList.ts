import {Task} from "./Task";
import { TaskLoader } from "./TaskLoader";
import { SerializedTask } from "./SerializedTask";
import { TaskFactory } from ".";

export class TaskList
{
	currentIndex : number;
	tasks : (TaskLoader | Task)[];

	constructor(tasks : (TaskLoader | Task)[])
	{
		this.currentIndex = 0;
		this.tasks = tasks;
	}

	Next() : TaskLoader | Task
	{
		return this.tasks[this.currentIndex++];
	}

	AllTasks() : (TaskLoader | Task)[]
	{
		return this.tasks;
	}

	RemainingTasks() : (TaskLoader | Task)[]
	{
		return this.tasks.slice(this.currentIndex);
	}

	IsComplete() : boolean
	{
		return this.currentIndex >= this.tasks.length;
	}

	Serialize() : any
	{
		let serializedTasks : SerializedTask[] = [];

		for (let i = 0; i < this.tasks.length; i++)
		{
			serializedTasks.push(this.tasks[i].Serialize());
		}

		return {
			currentIndex: this.currentIndex,
			tasks : serializedTasks
		}
	}

	static Deserialize(serialization : any, factory : TaskFactory) : TaskList
	{
		// let list = new TaskList(serialization.serializedTasks);
		let tasks : (Task | TaskLoader)[] = [];
		for (let i = 0; i < serialization.tests.length; i++)
		{
			tasks.push(factory.Create(serialization.tests[i]));
		}

		let list = new TaskList(tasks);
		list.currentIndex = serialization.currentIndex;

		return list;
	}
}