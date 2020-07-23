import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../io";
import { IdGenerator } from "../../util/IdGenerator";
import { Point } from "../../PlotData/Point";
import { Vector3, BufferGeometry, BufferAttribute, Vector2 } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { GraphPlane } from "../../io/ui/threejs/GraphPlane";
import { InteractableGraph } from "../../io/ui/components/InteractableGraph";

export class PlaneDisplay extends TaskDisplay
{
	private axisLength : number;
	private plane : GraphPlane;
	private graph : InteractableGraph;

	constructor(points : Point[], axisLength : number)
	{
		super();
		this.axisLength = axisLength;
		this.plane = new GraphPlane(points, axisLength);
		this.graph = new InteractableGraph(this.plane, axisLength, new Vector2(0,0), 180);
	}

	public Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().append(this.graph.Element());
		this.graph.RenderContinuously();
	}
	
}