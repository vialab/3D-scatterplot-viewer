import {Option} from "./Option";
import {TaskResult} from "./TaskResult";
import {TaskDisplay} from "../io";
import {Timer} from "../metrics";

export abstract class Task
{
	private resolve : (result : TaskResult) => any;
	private reject : (reason : any) => any;

	constructor()
	{
		this.resolve = (result : TaskResult) => null;
		this.reject = (reason : any) => null;
	}

	async WaitForCompletion() : Promise<TaskResult>
	{
		return new Promise<TaskResult>((resolve, reject) =>
		{
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	Complete(result : TaskResult) : void
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
	abstract GetDisplay() : TaskDisplay;
	abstract GetTimer() : Timer;
}