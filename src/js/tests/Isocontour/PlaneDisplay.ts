import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../io";
import { Point } from "../../PlotData/Point";
import { Vector2, DirectionalLight, AmbientLight } from "three";
import { GraphPlane } from "../../io/ui/threejs/GraphPlane";
import { InteractableGraph } from "../../io/ui/components/InteractableGraph";
import { FixedRotationGraph } from "../../io/ui/components/FixedRotationGraph";
import { Isolines } from "../../io/ui/threejs/Isolines";
import { WireframeCube } from "../../io/ui/threejs/WireFrameCube";

export class PlaneDisplay extends TaskDisplay
{
	private interactableGraph : InteractableGraph;
	private orthoGraph : FixedRotationGraph;

	constructor(points : Point[], axisLength : number)
	{
		super();

		let lightColor = new Three.Color(1, 1, 1);

		let interactableGraphBorder = new WireframeCube(axisLength);
		let orthoGraphBorder = new WireframeCube(axisLength);

		let interactablePlane = GraphPlane.FromPoints(points, axisLength);
		let orthoPlane = new Isolines(points, axisLength);
		
		this.interactableGraph = new InteractableGraph(interactableGraphBorder, interactablePlane, axisLength, new Vector2(0,0), new Three.Vector2(360, 30));
		this.interactableGraph.SetAmbientLightStrength(0.5);
		this.interactableGraph.SetCameraLightStrength(0.5);
		
		this.orthoGraph = new FixedRotationGraph(orthoGraphBorder, orthoPlane, axisLength, new Vector2(0,0));
		this.orthoGraph.UseOrthographicCamera();
	}

	public Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();

		screen.ComparisonViewContainer().append(this.interactableGraph.Element());
		screen.OriginalViewContainer().append(this.orthoGraph.Element());

		this.interactableGraph.RenderContinuously();
		this.orthoGraph.RenderOnce();
	}
	
}