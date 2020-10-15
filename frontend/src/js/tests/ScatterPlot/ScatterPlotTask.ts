import { TaskDisplay } from "../../io";
import { Option, Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { Point } from "../../plotData/Point";
import { InteractablePlotView } from "./InteractablePlotView";

export class ScatterPlotTask extends Task
{
	constructor(points : Point[], axisLength : number)
	{
		let display = new InteractablePlotView(points, axisLength-10);
		super(display, new EmptyTaskcontroller());

		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(true);
	}

	public LogResults(log : ResultLog) : void
	{
	}

	public Submit()
	{
		this.Controller.Submit((<InteractablePlotView>this.Display).GetOptions());
	}
}