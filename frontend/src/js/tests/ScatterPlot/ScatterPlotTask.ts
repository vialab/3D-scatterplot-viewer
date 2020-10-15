import { TaskDisplay } from "../../io";
import { Option, RequireOneSelectedOptionController, Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { Point } from "../../plotData/Point";
import { InteractablePlotView } from "./InteractablePlotView";
import { LimitedTimer } from "../../metrics";

export class ScatterPlotTask extends Task
{
	constructor(points : Point[], axisLength : number)
	{
		let display = new InteractablePlotView(points, axisLength-10);
		super(display, new RequireOneSelectedOptionController());

		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(true);

		this.SetTimer(new LimitedTimer(this, 600000));
	}

	public LogResults(log : ResultLog) : void
	{
	}

	public Submit()
	{
		this.Controller.Submit((<InteractablePlotView>this.Display).GetOptions());
	}
}