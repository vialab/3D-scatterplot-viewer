import { Task, TaskController, Option } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay } from "../../io";
import { SerializedTask } from "../../tasks/SerializedTask";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { Point } from "../../plotData/Point";
import { ContourPlotComparison } from "./Displays/ContourPlotComparison";
import { OptionButton } from "../../ui/components/OptionButton";

export class IsocontourTask extends Task
{
	options : OptionButton[];

	constructor(points : Point[], axisLength : number)
	{
		let options = [
			new OptionButton(0, "Yes", 0),
			new OptionButton(1, "No", 0)
		];

		for (let i = 0; i < options.length; i++)
			options[i].OnStateChanged = () => this.Submit()

		let graphDisplay = new ContourPlotComparison(
			points,
			options,
			axisLength
		);
		
		super(graphDisplay, new EmptyTaskcontroller());
		this.SetCofidenceTracked(true);
		this.SetPrompt("Does the contour plot represent the graph shown?");

		this.options = options;
	}

	public Submit()
	{
		this.Controller.Submit(this.options);
	}

	public LogResults(log : ResultLog) : void
	{
		
	}

	public Serialize() : SerializedTask
	{
		return {
			Name: IsocontourTask.name,
			DatasetName: "",
			Metadata: {}
		};	
	}

	public SetValues(serialization : SerializedTask)
	{

	}
}