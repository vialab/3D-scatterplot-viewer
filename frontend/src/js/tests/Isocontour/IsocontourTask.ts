import { Task, TaskController } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay } from "../../io";

export class IsocontourTask extends Task
{
	constructor(display : TaskDisplay, controller : TaskController)
	{
		super(display, controller);
		this.SetCofidenceTracked(true);
	}

	public LogResults(log : ResultLog) : void
	{
		
	}
}