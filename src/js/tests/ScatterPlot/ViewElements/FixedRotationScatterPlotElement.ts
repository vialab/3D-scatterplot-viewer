import * as Three from "three";

import { ScatterPlot } from "../ScatterPlot";
import { ScatterPlotElement } from "./ScatterPlotElement";
import { PlotPoint } from "../PlotPoint";
import { OrbitControls } from "three-orbitcontrols-ts";

export class FixedRotationScatterPlotElement extends ScatterPlotElement
{
	perspectiveRotator : OrbitControls;
	orthographicRotator : OrbitControls;
	
	constructor(points : PlotPoint[], axisLength : number, pointRadius : number, rotation : Three.Vector2)
	{
		super(points, axisLength, pointRadius);

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