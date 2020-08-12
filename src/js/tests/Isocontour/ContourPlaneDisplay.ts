import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../io";
import { Point } from "../../PlotData/Point";
import { Vector2, DirectionalLight, AmbientLight } from "three";
import { GraphPlane } from "../../ui/threejs/GraphPlane";
import { InteractableGraph } from "../../ui/components/InteractableGraph";
import { FixedRotationGraph } from "../../ui/components/FixedRotationGraph";
import { Isolines } from "../../ui/threejs/Isolines";
import { WireframeCube } from "../../ui/threejs/WireFrameCube";
import { AxisLabel } from "../../ui/threejs/AxisLabel";
import { Graph } from "../../ui/components/Graph";

export class ContourPlaneDisplay extends TaskDisplay
{
	private interactableGraph : Graph;
	private orthoGraph : Graph;

	constructor(points : Point[], axisLength : number)
	{
		super();

		let interactableAxisLabel = new AxisLabel(axisLength);
		let interactablePlane = GraphPlane.FromPoints(points, axisLength);
		let orthoPlane = new Isolines(points, axisLength);
		
		this.interactableGraph = new InteractableGraph(
			interactableAxisLabel,
			interactablePlane,
			axisLength,
			new Vector2(0,0),
			new Three.Vector2(360, 30)
		);
		this.interactableGraph.SetAmbientLightStrength(0.5);
		this.interactableGraph.SetCameraLightStrength(0.5);
		
		let orthoAxisLabel = new AxisLabel(axisLength);
		this.orthoGraph = new FixedRotationGraph(orthoAxisLabel, orthoPlane, axisLength, new Vector2(0,0));
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