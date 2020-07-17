import * as Three from "three";

import { ScatterPlotElement } from "./ScatterPlotElement";
import { OrbitControls } from "three-orbitcontrols-ts";
import { PlotPoint } from "../PlotPoint";

export class InteractableScatterPlotElement extends ScatterPlotElement
{
	perspectiveCameraOrbit : OrbitControls;
	orthographicCameraOrbit : OrbitControls;

	element : JQuery<HTMLElement>;

	constructor(points : PlotPoint[], axisLength : number, pointRadius : number, initialRotation : Three.Vector2, maxRotation : number)
	{
		super(points, axisLength, pointRadius);

		this.perspectiveCameraOrbit = new OrbitControls(this.perspectiveCamera, this.renderer.domElement);
		this.orthographicCameraOrbit = new OrbitControls(this.orthographicCamera, this.renderer.domElement);
		
		//TODO OrbitControls has max range from 0 to Math.PI
		this.applyAngleViewRange(initialRotation, maxRotation);

		this.element = super.Element();
		this.element.css("cursor", "grab");

		this.element.mousedown(() =>
		{
			this.element.css("cursor", "grabbing");
		});
		this.element.mouseup(() =>
		{
			this.element.css("cursor", "grab");
		});
	}

	protected applyAngleViewRange(initialRotation : Three.Vector2, maxRotation : number)
	{
		let initialX = this.toRadians(initialRotation.x);
		let initialY = this.toRadians(initialRotation.y);
		let maxDistance = this.toRadians(maxRotation);

		this.setViewRange(this.perspectiveCameraOrbit, initialX, initialY, maxDistance);
		this.setViewRange(this.orthographicCameraOrbit, initialX, initialY, maxDistance);

		this.perspectiveCameraOrbit.update();
		this.orthographicCameraOrbit.update();
	}

	protected setViewRange(orbit : OrbitControls, initialX : number, initialY : number, maxDistance : number)
	{
		//Wrap minX and minY within the OrbitControl's bounds of each axis
		let minX = initialX - maxDistance;
		let maxX = initialX + maxDistance;
		let minY = initialY - maxDistance;
		let maxY = initialY + maxDistance;

		orbit.minAzimuthAngle = minX;
		orbit.maxAzimuthAngle = maxX;
		orbit.minPolarAngle = minY;
		orbit.maxPolarAngle = maxY;
	}

	private isOutOfRange(value : number, min : number, max : number) : boolean
	{
		return value < min || value > max;
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}

	protected Render()
	{
		this.perspectiveCameraOrbit.update();
		this.orthographicCameraOrbit.update();

		super.Render();
	}
}