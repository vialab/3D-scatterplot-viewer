import {Task} from "../../tasks";
import { DemographicForm, DemographicFormData } from "./DemographicForm";
import { DemographicController } from "./DemographicController";
import { ResultLog, EducationLog } from "../../metrics/ResultLog";
import { SerializedTask } from "../../tasks/SerializedTask";

export class DemographicTask extends Task
{
	//Used in serialization
	protected savedValues : DemographicFormData | null;

	constructor()
	{
		let form = new DemographicForm(() =>
		{
			this.Controller.Submit([]);
			this.Metadata = form.GetInputData();
		});
		let controller = new DemographicController(form);

		super(form, controller);
		this.SetTitle("Screening");
		this.SetCofidenceTracked(false);
		this.SetExplicitSubmissionRequired(true);

		this.savedValues = null;
	}

	public async Initialize()
	{
		//If this task is being re-loaded (session restore), clear saved values
		this.savedValues = null;
	}

	public GetInputData() : DemographicFormData
	{
		return this.savedValues != null? this.savedValues
			: (<DemographicForm>this.Display).GetInputData();
	}

	public LogResults(log : ResultLog) : void
	{
		this.savedValues = this.GetInputData();
		let input = this.GetInputData();
		let demographic = log.Demographics;
		
		for (let i = 0; i < input.EducationHistory.length; i++)
		{
			let entry = input.EducationHistory[i];
			demographic.Education.push(entry);
		}
		
		demographic.VideoGames.TimeSpent = <number>input.VideoGamesTimeSpent;
		demographic.VideoGames.Description = <string>input.VideoGamesPlayed;
		
		demographic.VisualArt.TimeSpent = <number>input.TimeSpentMakingArt;
		demographic.VisualArt.Description = <string>input.TypesOfArtMade;

		demographic.WorkplaceDrawings.Importance = <number>input.WorkplaceDrawingImportance;
		demographic.WorkplaceDrawings.Description = <string>input.WorkplaceGraphicDescription;

		demographic.WorkplaceGraphics.Importance = <number>input.WorkplaceGraphicImportance;
		demographic.WorkplaceGraphics.Description = <string>input.WorkplaceGraphicDescription;

		demographic.Age = input.Age;
		demographic.FieldOfStudy = <number>input.FieldOfStudy;
		demographic.Gender = <string>input.Gender;
	}

	public Serialize() : SerializedTask
	{
		return {
			Name : DemographicTask.name,
			DatasetName: "",
			Metadata: {
				inputData: this.GetInputData()
			}
		};
	}

	public SetValues(serialization : SerializedTask)
	{
		this.savedValues = serialization.Metadata.inputData;
	}
}