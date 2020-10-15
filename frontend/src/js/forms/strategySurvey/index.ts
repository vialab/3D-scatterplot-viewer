import { ResultLog } from "../../metrics/ResultLog";
import { Task } from "../../tasks";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { StrategySurveyForm } from "./StrategySurveyForm";

export class StrategySurvey extends Task
{
	constructor()
	{
		super(new StrategySurveyForm(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(true);
	}

	public Submit(): void
	{
		this.Controller.Submit([]);
	}
	
	public LogResults(log: ResultLog): void
	{
	}
	
}