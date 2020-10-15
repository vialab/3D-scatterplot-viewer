import { Task, TaskController, Option } from "../../tasks";
import { TaskDisplay, UserInterface } from "../../io";
import { WaveGraphContourComparison } from "./Displays/WaveGraphContourComparison";
import { ResultLog } from "../../metrics/ResultLog";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { SerializedTask } from "../../tasks/SerializedTask";
import { TimedTestNotification } from "../../ui/components/TimedTestNotification";

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
				<p>
					You will be provided with a 2D isocontour (topographical) plot of a 3D surface and a 3D plot (see examples below).
					Chose whether the 2D and 3D plots match each other.
					You can rotate the 3D view by clicking on it and dragging your mouse.
				</p>
			</div>
			<hr />
			<div>
			</div>
		</div>`
		);

		template.find(".planeContainer").append(graph.GetPlaneView().Element());
		template.find(".graphContainer").append(graph.GetInteractableGraph().Element());

		template.append(new TimedTestNotification().Element());

		graph.GetPlaneView().RenderOnce();
		graph.GetInteractableGraph().RenderContinuously();

		screen.ViewModeContent();
		screen.SubmitButton().html("Begin");
		screen.ContentContainer().append(template);
	}

}