import {Task} from "./Task";

export class TaskList
{
	currentIndex : number;
	tests : Task[];

	constructor(tests : Task[])
	{
		this.currentIndex = 0;
		this.tests = tests;
	}

	Next() : Task
	{
		return this.tests[this.currentIndex++];
	}

	IsComplete() : boolean
	{
		return this.currentIndex >= this.tests.length;
	}
}