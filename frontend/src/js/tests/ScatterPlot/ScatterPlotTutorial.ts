import { Task, Option } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay, UserInterface } from "../../io";
import { RandomPoints } from "../../util/RandomPoints";
import { InteractableGraph } from "../../ui/components/InteractableGraph";
import { WireframeCube } from "../../ui/threejs/WireFrameCube";
import { ScatterPlotPoints } from "../../ui/threejs/ScatterPlotPoints";
import { Vector2, Plane } from "three";
import { Graph } from "../../ui/components/Graph";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { PlaneSelector } from "../../ui/components/PlaneSelector";
import { SerializedTask } from "../../tasks/SerializedTask";
import { TimedTestNotification } from "../../ui/components/TimedTestNotification";

export class ScatterPlotTutorial extends Task
{
	constructor()
	{
		super(new ScatterPlotTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("Scatter Plot Instructions");
		this.SetCofidenceTracked(false);
		this.SetExplicitSubmissionRequired(true);
	}

	public Submit()
	{
		this.Controller.Submit([]);
	}

	public LogResults(log: ResultLog): void
	{
	}
}

class ScatterPlotTutorialDisplay extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
		let graphAxisSize = 350;
		
		let points = RandomPoints.Generate(100, -1, 1);
		let interactablePlot = new InteractableGraph(
			new WireframeCube(graphAxisSize),
			ScatterPlotPoints.FromPoints(points, graphAxisSize, 5, 5),
			graphAxisSize,
			new Vector2(0,0),
			new Vector2(360, 360)
		);

		let orthographic = new Graph(
			new WireframeCube(graphAxisSize),
			ScatterPlotPoints.FromPoints(points, graphAxisSize, 5, 5),
			graphAxisSize
		);
		orthographic.UseOrthographicCamera();

		let planeSelector = new PlaneSelector();
		planeSelector.Bind(interactablePlot);

		let graphContainer = $(`<div style="display: flex;"></div>`);
		let ortho = $(`<div></div>`);
		let interactable = $(`<div></div>`);
		let interactionGrid = $(`<div style="width: 50%; margin-left: 50%"></div>`);

		let template = $(
		`<div style="text-align: center;">
			<hr />
			<p>You will be shown a single plane of a 3d scatter plot along with.</p>
			<p>Select the plane from which the 2d view is looking at the plot.</p>
			<hr />
		</div>`
		);

		ortho.append(orthographic.Element());
		interactable.append(interactablePlot.Element());
		interactionGrid.append(planeSelector.Element());

		graphContainer.append(ortho);
		graphContainer.append(interactable);
		
		template.prepend(interactionGrid);
		template.prepend(graphContainer);

		template.append(new TimedTestNotification().Element());

		orthographic.RenderOnce();
		interactablePlot.RenderContinuously();

		screen.SubmitButton().html("Begin");
		screen.ViewModeContent();
		screen.ContentContainer().append(template);
	}
}