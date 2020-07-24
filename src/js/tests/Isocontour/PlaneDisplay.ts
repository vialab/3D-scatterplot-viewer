import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../io";
import { IdGenerator } from "../../util/IdGenerator";
import { Point } from "../../PlotData/Point";
import { Vector3, BufferGeometry, BufferAttribute, Vector2 } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { GraphPlane } from "../../io/ui/threejs/GraphPlane";
import { InteractableGraph } from "../../io/ui/components/InteractableGraph";
import { FixedRotationGraph } from "../../io/ui/components/FixedRotationGraph";

export class PlaneDisplay extends TaskDisplay
{
	private graph : InteractableGraph;

	private orthoGraph : FixedRotationGraph;

	constructor(points : Point[], axisLength : number)
	{
		super();

		let plane = GraphPlane.FromPoints(points, axisLength);
		let orthoPlane = GraphPlane.Clone(plane);

		this.graph = new InteractableGraph(plane, axisLength, new Vector2(0,0), 180);
		this.orthoGraph = new FixedRotationGraph(orthoPlane, axisLength, new Vector2(0,0));
		this.orthoGraph.UseOrthographicCamera();
	}

	public Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();

		screen.ComparisonViewContainer().append(this.graph.Element());
		screen.OriginalViewContainer().append(this.orthoGraph.Element());

		this.graph.RenderContinuously();
		this.orthoGraph.RenderOnce();
	}
	
}