import {Option} from "./Option";
import {TaskResult} from "./TaskResult";
import {TaskDisplay} from "../io";
import {Timer, UnlimitedTimer} from "../metrics";

export abstract class Task
{
	protected result : TaskResult;

	private promise : Promise<TaskResult>;
	protected resolve : (result : TaskResult) => any;
	protected reject : (reason : any) => any;

	private title : string;
	private prompt : string;
	private timer : Timer;
	private trackConfidence : boolean;
	private trackResults : boolean;
	private explicitSubmissionRequired : boolean;

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

		this.title = "";
		this.prompt = "";
		this.timer = new UnlimitedTimer();
		this.trackConfidence = false;
		this.trackResults = false;
		this.explicitSubmissionRequired = false;
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

	abstract GetOptions() : Option[];
	abstract GetDisplay() : TaskDisplay;

	SetTitle(title : string) : void
	{
		this.title = title;
	}

	GetTitle() : string
	{
		return this.title;
	}

	SetPrompt(prompt : string) : void
	{
		this.prompt = prompt;	
	}
	GetPrompt() : string
	{
		return this.prompt;
	}

	SetTimer(timer : Timer) : void
	{
		this.timer = timer;
	}
	GetTimer() : Timer
	{
		return this.timer;
	}

	SetCofidenceTracked(track : boolean) : void
	{
		this.trackConfidence = track;	
	}
	IsConfidenceTracked() : boolean
	{
		return this.trackConfidence;
	}

	SetExplicitSubmissionRequired(submit : boolean) : void
	{
		this.explicitSubmissionRequired = submit;
	}
	IsExplicitSubmissionRequired() : boolean
	{
		return this.explicitSubmissionRequired;
	}

	SetResultsTracked(track : boolean) : void
	{
		this.trackResults = track;	
	}
	IsResultsTracked() : boolean
	{
		return this.trackResults;
	}
}