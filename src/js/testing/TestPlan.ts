import {Test} from "./Test";

export class TestPlan
{
	currentIndex : number;
	tests : Test[];

	constructor(tests : Test[])
	{
		this.currentIndex = 0;
		this.tests = tests;
	}

	Next() : Test
	{
		return this.tests[this.currentIndex++];
	}

	IsComplete() : boolean
	{
		return this.currentIndex >= this.tests.length;
	}
}