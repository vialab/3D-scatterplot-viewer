import {Option} from "./Option";
import {TaskResult} from "./TaskResult";
import {TaskDisplay} from "../io";
import {Timer} from "../metrics";

export abstract class Task
{
	protected result : TaskResult;

	private promise : Promise<TaskResult>;
	protected resolve : (result : TaskResult) => any;
	protected reject : (reason : any) => any;

	constructor()
	{
		this.resolve = (result : TaskResult) => null;
		this.reject = (reason : any) => null;

		this.promise = new Promise<TaskResult>((resolve, reject) =>
		{
			this.resolve = resolve;
			this.reject = reject;
		});
		
		this.result = new TaskResult();
	}

	async WaitForCompletion() : Promise<TaskResult>
	{
		return this.promise;
	}

	Complete() : void
	{
		this.resolve(this.result);
	}

	Error(reason : any)
	{
		this.reject(reason);
	}

	abstract OptionSelected(selectedOptions : Option) : void;

	abstract GetTitle() : string;
	abstract GetPrompt() : string;
	abstract GetOptions() : Option[];
	abstract GetDisplay() : TaskDisplay;
	abstract GetTimer() : Timer;

	abstract IsConfidenceTracked() : boolean;
	abstract IsResultsTracked() : boolean;
}