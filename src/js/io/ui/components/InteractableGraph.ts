import * as Three from "three";

import { Graph } from "./Graph";
import { OrbitControls } from "three-orbitcontrols-ts";
import { ThreeJsComponent } from "../threejs/ThreeJsComponent";

export class InteractableGraph extends Graph
{
	perspectiveCameraOrbit : OrbitControls;
	orthographicCameraOrbit : OrbitControls;

	element : JQuery<HTMLElement>;

	constructor(points : ThreeJsComponent, axisLength : number, initialRotation : Three.Vector2, maxRotation : number)
	{
		super(points, axisLength);

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
		let maxDistance = this.toRadians(maxRotation);

		this.setCurrentRotation(this.perspectiveCamera, initialRotation);
		this.setCurrentRotation(this.orthographicCamera, initialRotation);

		this.setViewRange(this.perspectiveCameraOrbit, maxDistance);
		this.setViewRange(this.orthographicCameraOrbit, maxDistance);
	}

	protected setViewRange(orbit : OrbitControls, maxDistance : number)
	{
		//Wrap minX and minY within the OrbitControl's bounds of each axis
		let minX = -maxDistance;
		let maxX = maxDistance;
		let minY = -maxDistance;
		let maxY = maxDistance;

		orbit.minAzimuthAngle = minX;
		orbit.maxAzimuthAngle = maxX;
		orbit.minPolarAngle = minY;
		orbit.maxPolarAngle = maxY;
	}

	private setCurrentRotation(camera : Three.Camera, rotation : Three.Vector2)
	{
		//Silly hack that has to do with OrbitControls' rotation limits
		let control = new OrbitControls(camera);
		control.minAzimuthAngle = this.toRadians(rotation.x);
		control.maxAzimuthAngle = this.toRadians(rotation.x);
		control.minPolarAngle = this.toRadians(rotation.y);
		control.maxPolarAngle = this.toRadians(rotation.y);

		control.update();
		control.dispose();
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