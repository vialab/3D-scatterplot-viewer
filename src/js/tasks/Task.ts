
import {TaskDisplay} from "../io";
import {TaskController} from "./TaskController";
import { Timer, UnlimitedTimer } from "../metrics";

export class Task
{
	public Metadata : Object = {};

	public Display : TaskDisplay;
	public Controller : TaskController;

	private title : string;
	private prompt : string;
	private timer : Timer;
	private trackConfidence : boolean;
	private trackResults : boolean;
	private explicitSubmissionRequired : boolean;
	
	constructor(display : TaskDisplay, controller : TaskController)
	{
		this.Display = display;
		this.Controller = controller;

		this.title = "";
		this.prompt = "";
		this.timer = new UnlimitedTimer();
		this.trackConfidence = false;
		this.trackResults = false;
		this.explicitSubmissionRequired = false;
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