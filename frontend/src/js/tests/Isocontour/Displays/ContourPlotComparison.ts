import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../../io";
import { Point } from "../../../plotData/Point";
import { Vector2, DirectionalLight, AmbientLight } from "three";
import { GraphPlane } from "../../../ui/threejs/GraphPlane";
import { InteractableGraph } from "../../../ui/components/InteractableGraph";
import { Isolines } from "../../../ui/threejs/Isolines";
import { AxisLabel } from "../../../ui/threejs/AxisLabel";
import { Graph } from "../../../ui/components/Graph";
import { GraphRotationTracker } from "../../../metrics";

export class ContourPlotComparison extends TaskDisplay
{
	public readonly RotationMetrics : GraphRotationTracker;

	private interactableGraph : InteractableGraph;
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
		this.interactableGraph.SetAmbientLightStrength(1);
		this.interactableGraph.SetCameraLightStrength(0);
		
		let orthoAxisLabel = new AxisLabel(axisLength);
		this.orthoGraph = new Graph(orthoAxisLabel, orthoPlane, axisLength);
		this.orthoGraph.UseOrthographicCamera();

		this.RotationMetrics = new GraphRotationTracker(
			this.interactableGraph.Element(),
			this.interactableGraph.GetRotation(),
			() =>
			{
				return this.interactableGraph.GetOrbitRotation();
			}
		);
	}

	public GetInteractableGraph() : Graph
	{
		return this.interactableGraph;
	}

	public GetPlaneView() : Graph
	{
		return this.orthoGraph;
	}

	public Display(screen: UserInterface): void
	{
		this.GetInteractableGraph().RenderContinuously();
		this.GetPlaneView().RenderOnce();

		screen.ViewModeComparison();

		screen.ComparisonViewContainer().append(this.GetInteractableGraph().Element());
		screen.OriginalViewContainer().append(this.GetPlaneView().Element());
	}
	
}