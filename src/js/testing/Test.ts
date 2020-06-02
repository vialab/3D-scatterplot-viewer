import {Option} from "./Option";
import {TestResult} from "./TestResult";
import {TestDisplay} from "../io";

export abstract class Test
{
	private resolve : (result : TestResult) => any;
	private reject : (reason : any) => any;

	constructor()
	{
		this.resolve = (result : TestResult) => null;
		this.reject = (reason : any) => null;
	}

	async WaitForCompletion() : Promise<TestResult>
	{
		return new Promise<TestResult>((resolve, reject) =>
		{
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	Complete(result : TestResult) : void
	{
		this.resolve(result);
	}

	Error(reason : any)
	{
		this.reject(reason);
	}

	abstract SubmitOptions(selectedOptions : Option[]) : void;

	abstract GetTitle() : string;
	abstract GetOptions() : Option[];
	abstract GetDuration() : number;
	abstract GetDisplay() : TestDisplay;
}