import {Option} from "./Option";
import {TaskResult} from "./TaskResult";
import {TaskDisplay, UserInterface} from "../io";
import {Timer, UnlimitedTimer} from "../metrics";

export abstract class Task
{
	protected result : TaskResult;

	private promise : Promise<TaskResult>;
	protected resolve : (result : TaskResult) => any;
	protected reject : (reason : any) => any;

	private display : TaskDisplay;

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

		this.display = new NoDisplay();

		this.title = "";
		this.prompt = "";
		this.timer = new UnlimitedTimer();
		this.trackConfidence = false;
		this.trackResults = false;
		this.explicitSubmissionRequired = false;
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
	
	public SetDisplay(display : TaskDisplay)
	{
		this.display = display;
	}

	public GetDisplay() : TaskDisplay
	{
		return this.display;
	}

	public SetTitle(title : string) : void
	{
		this.title = title;
	}

	public GetTitle() : string
	{
		return this.title;
	}

	public SetPrompt(prompt : string) : void
	{
		this.prompt = prompt;	
	}
	public GetPrompt() : string
	{
		return this.prompt;
	}

	public SetTimer(timer : Timer) : void
	{
		this.timer = timer;
	}
	public GetTimer() : Timer
	{
		return this.timer;
	}

	public SetCofidenceTracked(track : boolean) : void
	{
		this.trackConfidence = track;	
	}
	public IsConfidenceTracked() : boolean
	{
		return this.trackConfidence;
	}

	public SetExplicitSubmissionRequired(submit : boolean) : void
	{
		this.explicitSubmissionRequired = submit;
	}
	public IsExplicitSubmissionRequired() : boolean
	{
		return this.explicitSubmissionRequired;
	}

	public SetResultsTracked(track : boolean) : void
	{
		this.trackResults = track;	
	}
	public IsResultsTracked() : boolean
	{
		return this.trackResults;
	}
}

class NoDisplay extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
	}
}