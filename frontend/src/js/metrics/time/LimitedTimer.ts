import {Timer} from "./Timer";
import {Task, TaskResult} from "../../tasks";

export class LimitedTimer extends Timer
{
	private duration : number;
	private task : Task;

	constructor(task : Task, duration: number)
	{
		super();
		this.task = task;
		this.duration = duration;
	}

	Tick()
	{
		if (this.Progress() >= 100)
		{
			//TODO make special result for timeout?
			this.task.Controller.Complete();
		}
	}

	Progress(): number
	{
		let progress : number = this.startTime == 0? 0 : (this.ElapsedTime() / this.duration) * 100;
		progress = progress > 100? 100 : progress;

		return progress;
	}
}