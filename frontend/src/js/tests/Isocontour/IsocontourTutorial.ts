import { Task, TaskController, Option } from "../../tasks";
import { TaskDisplay, UserInterface } from "../../io";
import { WaveGraphContourComparison } from "./Displays/WaveGraphContourComparison";
import { ResultLog } from "../../metrics/ResultLog";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { SerializedTask } from "../../tasks/SerializedTask";

export class IsocontourTutorial extends Task
{
	constructor()
	{
		super (new IsoTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("Isocontour Instructions");
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public LogResults(log : ResultLog) : void
	{
	}
	
	public Submit()
	{
		this.Controller.Submit([]);
	}

	public Serialize() : SerializedTask
	{
		return {
			Name: IsocontourTutorial.name,
			DatasetName: "",
			Metadata: {}
		};	
	}
}

class IsoTutorialDisplay extends TaskDisplay
{
	constructor()
	{
		super();
	}

	public Display(screen: UserInterface): void
	{
		let graph = new WaveGraphContourComparison(400);
		let template = $(
		`<div style="width: 800px; text-align: center;">
			<div style="display: flex; justify-content: center;">
				<div class="planeContainer">
				</div>
				<div class="graphContainer">
				</div>
			</div>
			
			<hr />
			<div style="text-align: center;">
				<p>You will be shown a in isocontour in 2d and 3d.</p>
				<p>Choose whether the 2d and 3d isocontours match.</p>
			</div>
			<hr />
			<div>
			</div>
		</div>`
		);

		template.find(".planeContainer").append(graph.GetPlaneView().Element());
		template.find(".graphContainer").append(graph.GetInteractableGraph().Element());

		graph.GetPlaneView().RenderOnce();
		graph.GetInteractableGraph().RenderContinuously();

		screen.ViewModeContent();
		screen.SubmitButton().html("Begin");
		screen.ContentContainer().append(template);
	}

}