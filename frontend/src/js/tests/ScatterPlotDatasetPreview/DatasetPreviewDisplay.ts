import { active } from "d3";
import { Vector2, Vector3 } from "three";
import { Backend } from "../../Backend";
import { TaskDisplay, UserInterface } from "../../io";
import { Dataset } from "../../plotData/Dataset";
import { Point } from "../../plotData/Point";
import { DatasetLoader } from "../../ui/components/DatasetLoader";
import { Graph } from "../../ui/components/Graph";
import { InteractableGraph } from "../../ui/components/InteractableGraph";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";
import { ScatterPlotPoints } from "../../ui/threejs/ScatterPlotPoints";
import { ThreeJsComponent } from "../../ui/threejs/ThreeJsComponent";
import { WireframeCube } from "../../ui/threejs/WireFrameCube";
import { UiElement } from "../../ui/UiElement";
import { PlaneRotation } from "../ScatterPlot/PlaneRotation";

const SIDE_LENGTH = 400;

export class DatasetPreviewDisplay extends TaskDisplay
{
	private loadMenu : DatasetLoader;
	private points : Point[] = [];
	private activeScreen : UserInterface | null = null;

	rotationUpdateInterval : any;

	constructor(loadMenu : DatasetLoader)
	{
		super();
		this.loadMenu = loadMenu;
	}

	public SetPoints(points : Point[])
	{
		this.points = points;
	}

	public ReDisplay()
	{
		if (this.activeScreen != null)
		{
			this.Display(this.activeScreen);
		}
	}

	public Display(screen: UserInterface): void
	{
		this.activeScreen = screen;

		this.loadMenu.Element().detach();
		screen.ContentContainer().html("");
		
		let template = $(`<div class="center-content"></div>`);
		template.append(this.loadMenu.Element());

		template.append("<hr />");
		
		let interactiveDiv = $(`<div class="center-content"></div>`);
		interactiveDiv.append("<span>Interactive</span>");

		let currentRotationDiv = $("<div>Current Rotation: (0,0)</div>");
		interactiveDiv.append(currentRotationDiv);	
		
		let interactiveView = this.CreateInteractive();
		
		clearInterval(this.rotationUpdateInterval);
		this.rotationUpdateInterval = setInterval(() => {
			let rotation = interactiveView.GetOrbitRotation();
			currentRotationDiv.html(`Current Rotation: (${Math.round(rotation.x)}, ${Math.round(rotation.y)})`);
		}, 100);

		interactiveDiv.append(interactiveView.Element());
		template.append(interactiveDiv);

		template.append("<hr />");

		let topDiv = $(`<div class="center-content"></div>`);
		let topView = this.CreateOrthographic(GraphPlaneNormals.UP);
		topDiv.append("<span>Top</span>");
		topDiv.append(topView.Element());
		template.append(topDiv);

		template.append("<hr />");

		let botDiv = $(`<div class="center-content"></div>`);
		let botView = this.CreateOrthographic(GraphPlaneNormals.DOWN);
		botDiv.append("<span>Bottom</span>");
		botDiv.append(botView.Element());
		template.append(botDiv);

		template.append("<hr />");

		let leftDiv = $(`<div class="center-content"></div>`);
		let leftView = this.CreateOrthographic(GraphPlaneNormals.LEFT);
		leftDiv.append("<span>Left</span>");
		leftDiv.append(leftView.Element());
		template.append(leftDiv);

		template.append("<hr />");

		let rightDiv = $(`<div class="center-content"></div>`);
		let rightView = this.CreateOrthographic(GraphPlaneNormals.RIGHT);
		rightDiv.append("<span>Right</span>");
		rightDiv.append(rightView.Element());
		template.append(rightDiv);

		template.append("<hr />");

		let farDiv = $(`<div class="center-content"></div>`);
		let farView = this.CreateOrthographic(GraphPlaneNormals.AWAY);
		farDiv.append("<span>Far</span>");
		farDiv.append(farView.Element());
		template.append(farDiv);

		template.append("<hr />");

		let nearDiv = $(`<div class="center-content"></div>`);
		let nearView = this.CreateOrthographic(GraphPlaneNormals.TOWARDS);
		nearDiv.append("<span>Near</span>");
		nearDiv.append(nearView.Element());
		template.append(nearDiv);

		screen.ViewModeContent();
		screen.ContentContainer().append(template);
	}

	private CreateInteractive()
	{
		let graph = new InteractableGraph(
			new WireframeCube(SIDE_LENGTH),
			ScatterPlotPoints.FromPoints(this.points, SIDE_LENGTH, 5, 10),
			SIDE_LENGTH,
			new Vector2(0,0),
			new Vector2(360, 180)
		);
		
		graph.UsePerspectiveCamera();
		graph.RenderContinuously();

		return graph;
	}

	private CreateOrthographic(normal : Vector3)
	{
		let rotation = PlaneRotation.RotationFor(normal);
		let graph = new Graph(new WireframeCube(SIDE_LENGTH), ScatterPlotPoints.FromPoints(this.points, SIDE_LENGTH, 5, 10), SIDE_LENGTH);
		graph.SetAmbientLightStrength(1);
		graph.SetCameraLightStrength(0);
		graph.UseOrthographicCamera();
		graph.SetRotation(rotation);

		graph.RenderOnce();

		return graph;
	}
}