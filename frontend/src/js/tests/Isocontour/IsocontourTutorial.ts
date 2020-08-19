import { Task, TaskController, Option } from "../../tasks";
import { TaskDisplay, UserInterface } from "../../io";
import { WaveGraphContourComparison } from "./Displays/WaveGraphContourComparison";

export class IsocontourTutorial extends Task
{
	constructor()
	{
		super (new IsoTutorialDisplay(), new IsoTutorialController());
		this.SetExplicitSubmissionRequired(true);
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
		let graph = new WaveGraphContourComparison(300);
		let template = $(
		`<div style="width: 800px; text-align: center;">
			<div style="display: flex; justify-content: center;">
				<div class="planeContainer">
				</div>
				<div class="graphContainer">
				</div>
			</div>
			
			<hr />
			<div>
				This is where the explanation goes
			</div>
			<hr />
			<div>
				This is where the timer notification goes
			</div>
		</div>`
		);

		template.find(".planeContainer").append(graph.GetPlaneView().Element());
		template.find(".graphContainer").append(graph.GetInteractableGraph().Element());

		graph.GetPlaneView().RenderOnce();
		graph.GetInteractableGraph().RenderContinuously();

		screen.ViewModeContent();
		screen.ContentContainer().append(template);
	}

}

class IsoTutorialController extends TaskController
{
	public Submit(selectedOptions: Option | Option[]): void
	{
		this.Complete();
	}

	public GetOptions(): Option[]
	{
		return [];
	}
}