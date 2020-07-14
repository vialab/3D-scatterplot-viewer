import * as Three from "three";
import { PlotPoint } from "../PlotPoint";
import { CubeElement } from "./CubeElement";
import { Points } from "three";
import { PointsElement } from "./PointsElement";
import { OrbitControls } from "three-orbitcontrols-ts";

export class ScatterPlotElement
{
	//For some reason getWorldDirection needs this, using single instance to save memory alloc
	protected static worldDirectionParameterVector = new Three.Vector3();
	protected CAMERA_PADDING : number = 125;

	protected renderer : Three.WebGLRenderer;
	protected scene : Three.Scene;
	protected activeCamera : Three.Camera;
	protected perspectiveCamera : Three.PerspectiveCamera;
	protected orthographicCamera : Three.OrthographicCamera;

	protected cube : CubeElement;
	protected points : PointsElement;

	constructor(points : PlotPoint[], axisLength : number, pointRadius : number)
	{
		this.renderer = new Three.WebGLRenderer();
		this.renderer.setSize(axisLength, axisLength);
		this.renderer.setClearColor(0xffffff);

		this.scene = new Three.Scene();

		this.perspectiveCamera = new Three.PerspectiveCamera(90, 1, 0.1, axisLength*3);
		this.perspectiveCamera.position.z = axisLength + this.CAMERA_PADDING;

		let orthographicSideLength = axisLength/2 + this.CAMERA_PADDING;
		this.orthographicCamera = new Three.OrthographicCamera(
			-orthographicSideLength,
			orthographicSideLength,
			orthographicSideLength,
			-orthographicSideLength,
			0.1, axisLength * 3
		);
		this.orthographicCamera.position.z = axisLength;

		this.activeCamera = this.perspectiveCamera;

		this.cube = new CubeElement(axisLength);
		this.scene.add(this.cube.WireFrame());

		this.points = new PointsElement(points, pointRadius);
		let spheres = this.points.Points();
		for (let i = 0; i < spheres.length; i++)
		{
			this.scene.add(spheres[i]);
		}

		//Silly hack for requestAnimationFrame call
		this.RenderContinuously = this.RenderContinuously.bind(this);
	}

	protected toRadians(deg : number)
	{
		return deg * Math.PI / 180;
	}

	public TogglePlaneHighlight(planeNormal : Three.Vector3)
	{
		this.cube.TogglePlaneHighlight(this.scene, planeNormal);
	}

	public CameraNormal() : Three.Vector3
	{
		let direction = new Three.Vector3(this.activeCamera.position.x, this.activeCamera.position.y, -this.activeCamera.position.z);
		return direction.normalize();
	}

	public UsePerspectiveCamera() : void
	{
		this.activeCamera = this.perspectiveCamera;
	}

	public UseOrthographicCamera() : void
	{
		this.activeCamera = this.orthographicCamera;
	}

	public RenderContinuously() : void
	{
		requestAnimationFrame(this.RenderContinuously);
		this.Render();
	}

	public RenderOnce() : void
	{
		this.Render();
	}

	protected Render()
	{
		this.activeCamera.lookAt(0,0,0);
		this.renderer.render(this.scene, this.activeCamera);
	}

	Element() : JQuery<HTMLElement>
	{
		return $(this.renderer.domElement);
	}
}