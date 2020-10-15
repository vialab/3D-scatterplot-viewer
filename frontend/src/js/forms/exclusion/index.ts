import { Task, TaskController, Option } from "../../tasks";
import { DemographicForm } from "../demograpic/DemographicForm";
import { IshiharaForm } from "../ishihara/IshiharaForm";
import { ExclusionForm } from "./ExclusionForm";
import { ExclusionController } from "./ExclusionController";
import { DemographicTask } from "../demograpic";
import { Backend } from "../../Backend";
import { IshiharaTask } from "../ishihara";
import { ResultLog } from "../../metrics/ResultLog";
import { SerializedTask } from "../../tasks/SerializedTask";

export class DemographicExclusion extends Task
{
	//Serialized exclusion value
	isExcluded : boolean | null;

	backend : Backend;	
	survey : DemographicTask;
	ishihara : IshiharaTask;

	constructor(backend : Backend, demographicSurvey : DemographicTask, ishihara : IshiharaTask)
	{
		super(new ExclusionForm(), new ExclusionController());
		this.backend = backend;
		this.survey = demographicSurvey;
		this.ishihara = ishihara;

		this.SetCofidenceTracked(false);

		this.isExcluded = null;
	}

	public Submit()
	{
		this.Controller.Submit([]);
	}

	public async Initialize() : Promise<void>
	{
		let surveyData = this.survey.GetInputData();
		let isIshiharaCorrect = this.ishihara.IsCorrect();

		let isExcluded = this.isExcluded =
			this.isExcluded === true ||
			!surveyData.IsBachelorsAchieved
			|| !isIshiharaCorrect
			|| !await this.backend.IsFieldOfStudyAllowed(<number>surveyData.FieldOfStudy);

		(<ExclusionForm>this.Display).IsExcluded = isExcluded;

		if (!isExcluded)
		{
			this.Controller.Complete();
		}

		return;
	}

	public LogResults(log : ResultLog) : void
	{
	}

	public Serialize() : SerializedTask
	{
		let s = super.Serialize();
		s.Metadata = {
			isExcluded: this.isExcluded
		};
		return s;
	}

	public SetValues(serialization : SerializedTask)
	{
		super.SetValues(serialization);
		this.isExcluded = serialization.Metadata.isExcluded;
	}
}