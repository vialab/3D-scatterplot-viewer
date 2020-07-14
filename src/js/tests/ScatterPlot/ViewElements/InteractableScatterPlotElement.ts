import * as Three from "three";

import { ScatterPlotElement } from "./ScatterPlotElement";
import { OrbitControls } from "three-orbitcontrols-ts";
import { PlotPoint } from "../PlotPoint";

export class InteractableScatterPlotElement extends ScatterPlotElement
{
	orbit : OrbitControls;
	element : JQuery<HTMLElement>;

	constructor(points : PlotPoint[], axisLength : number, pointRadius : number, initialRotation : Three.Vector2, maxRotation : number)
	{
		super(points, axisLength, pointRadius);

		this.orbit = new OrbitControls(this.activeCamera, this.renderer.domElement);
		
		//TODO OrbitControls has max range from 0 to Math.PI
		let initialX = this.toRadians(initialRotation.x)
		let initialY = this.toRadians(initialRotation.y);
		let maxDistance = this.toRadians(maxRotation);

		this.orbit.maxAzimuthAngle = initialX + maxDistance;
		this.orbit.minAzimuthAngle = initialX - maxDistance;
		this.orbit.maxPolarAngle = initialY + maxDistance;
		this.orbit.minPolarAngle = initialY - maxDistance;

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

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}

	protected Render()
	{
		this.orbit.update();
		super.Render();
		
		this.activeCamera.lookAt(0,0,0);
		this.renderer.render(this.scene, this.activeCamera);
	}
}