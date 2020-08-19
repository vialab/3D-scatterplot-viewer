import * as Three from "three";

import { Graph } from "./Graph";
import { OrbitControls } from "three-orbitcontrols-ts";
import { ThreeJsComponent } from "../threejs/ThreeJsComponent";

export class FixedRotationGraph extends Graph
{
	perspectiveRotator : OrbitControls;
	orthographicRotator : OrbitControls;
	
	constructor(border : ThreeJsComponent, points : ThreeJsComponent, axisLength : number, rotation : Three.Vector2)
	{
		super(border, points, axisLength);

		this.perspectiveRotator = new OrbitControls(this.perspectiveCamera, this.renderer.domElement);
		this.orthographicRotator = new OrbitControls(this.orthographicCamera, this.renderer.domElement);

		this.applyRotation(this.perspectiveRotator, rotation);
		this.applyRotation(this.orthographicRotator, rotation);
	}

	protected applyRotation(orbitor : OrbitControls, rotation : Three.Vector2)
	{
		orbitor.minAzimuthAngle = this.toRadians(rotation.x);
		orbitor.maxAzimuthAngle = this.toRadians(rotation.x);
		orbitor.minPolarAngle = this.toRadians(rotation.y);
		orbitor.maxPolarAngle = this.toRadians(rotation.y);

		orbitor.update();
	}
}