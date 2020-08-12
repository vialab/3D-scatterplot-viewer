import * as Three from "three";
import { thresholdScott } from "d3";

export class CameraInteractor
{
	protected canvas : JQuery<HTMLElement>;
	protected camera : Three.Camera;
	protected centerPoint : Three.Vector3;

	protected isDragActive : boolean = false;
	protected previousX : number = 0;
	protected previousY : number = 0;

	protected xDelta = 0;
	protected yDelta = 0;

	protected fullCanvasDragRotation = Math.PI*180/180;

	constructor(canvas : JQuery<HTMLElement>, camera : Three.Camera, centerPoint : Three.Vector3)
	{
		this.canvas = canvas;
		this.camera = camera;
		this.centerPoint = new Three.Vector3(centerPoint.x, centerPoint.y, centerPoint.z);
	}

	public ApplyHandlers()
	{
		this.canvas.mousedown((event) =>
		{
			this.updateMousePosition(event);
			this.xDelta = 0;
			this.yDelta = 0;
			this.isDragActive = true;
		});

		this.canvas.mousemove((event) =>
		{
			if (this.isDragActive)
			{
				this.updateMousePosition(event);

				let yRatio = this.xDelta / <number>this.canvas.width();
				let yRotation = yRatio * this.fullCanvasDragRotation;

				let xRatio = this.yDelta / <number>this.canvas.height();
				let xRotation = xRatio * this.fullCanvasDragRotation;
				
				this.camera.position.applyAxisAngle(new Three.Vector3(0,1,0), -yRotation);
				this.camera.position.applyAxisAngle(new Three.Vector3(1,0,0), -xRotation);
				this.camera.lookAt(this.centerPoint);
			}
		});

		this.canvas.mouseup((event) =>
		{
			this.isDragActive = false;
		});

		this.canvas.mouseleave((event) =>
		{
			this.isDragActive = false;
		});
	}

	protected updateMousePosition(event : JQuery.MouseEventBase)
	{
		this.xDelta = event.clientX - this.previousX;
		this.yDelta = event.clientY - this.previousY;

		this.previousX = event.pageX;
		this.previousY = event.pageY;
	}
}