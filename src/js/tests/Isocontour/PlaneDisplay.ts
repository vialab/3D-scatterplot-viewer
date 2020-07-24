import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../io";
import { IdGenerator } from "../../util/IdGenerator";
import { Point } from "../../PlotData/Point";
import { Vector3, BufferGeometry, BufferAttribute, Vector2, DirectionalLight, AmbientLight } from "three";
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

		let plane = GraphPlane.FromPoints(points, axisLength-10);
		let orthoPlane = GraphPlane.Clone(plane);

		this.graph = new InteractableGraph(plane, axisLength, new Vector2(0,0), new Three.Vector2(360, 30));
		this.orthoGraph = new FixedRotationGraph(orthoPlane, axisLength, new Vector2(0,0));
		this.orthoGraph.UseOrthographicCamera();

		let lightColor = new Three.Color(255, 255, 255);
		let light = new DirectionalLight(lightColor, 0.001);
		let secondLight = new AmbientLight(lightColor, 0.003);

		light.position.set(0, axisLength, axisLength);
		light.target.position.set(0,0,0);

		secondLight.position.set(0,axisLength,0);
		// secondLight.target.position.set(0,0,0);

		this.graph.AddToScene(light);
		this.graph.AddToScene(secondLight);

		this.orthoGraph.AddToScene(new AmbientLight(lightColor, 1));
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