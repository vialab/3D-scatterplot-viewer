import {Option} from "./Option";
import {TaskResult} from "./TaskResult";
import {TaskDisplay, UserInterface} from "../io";
import {Timer, UnlimitedTimer} from "../metrics";

export abstract class TaskController
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

	public async WaitForCompletion() : Promise<TaskResult>
	{
		return this.promise;
	}

	public Complete() : void
	{
		this.resolve(this.result);
	}

	Error(reason : any)
	{
		this.reject(reason);
	}

	public abstract Submit(selectedOptions : Option | Option[]) : void;
	public abstract GetOptions() : Option[];
}

class NoDisplay extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
	}
}