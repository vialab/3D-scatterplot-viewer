import * as Three from "three";
import { WireframeCube } from "../threejs/WireFrameCube";
import { ThreeJsComponent } from "../threejs/ThreeJsComponent";
import {UiElement} from "../UiElement";

export class Graph implements UiElement
{
	//For some reason getWorldDirection needs this, using single instance to save memory alloc
	protected static worldDirectionParameterVector = new Three.Vector3();
	protected CAMERA_PADDING : number = 125;

	protected renderer : Three.WebGLRenderer;
	protected scene : Three.Scene;
	protected activeCamera : Three.Camera;
	protected perspectiveCamera : Three.PerspectiveCamera;
	protected orthographicCamera : Three.OrthographicCamera;

	protected cube : WireframeCube;
	protected data : ThreeJsComponent;

	constructor(data : ThreeJsComponent, axisLength : number)
	{
		this.renderer = new Three.WebGLRenderer();
		this.renderer.setSize(axisLength, axisLength);
		this.renderer.setClearColor(0xffffff);

		this.scene = new Three.Scene();

		this.perspectiveCamera = new Three.PerspectiveCamera(50, 1, 0.1, axisLength*4);
		this.perspectiveCamera.position.z = axisLength*2 + this.CAMERA_PADDING;

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

		this.cube = new WireframeCube(axisLength);
		this.scene.add(this.cube.Component());

		this.data = data;
		this.scene.add(this.data.Component());

		//Silly hack for requestAnimationFrame call
		this.RenderContinuously = this.RenderContinuously.bind(this);
	}

	public AddToScene(obj : Three.Object3D) : void
	{
		this.scene.add(obj);
	}

	public RemoveFromScene(obj : Three.Object3D) : void
	{
		this.scene.remove(obj);
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