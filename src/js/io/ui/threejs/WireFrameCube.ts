import * as Three from "three";
import GraphPlaneNormals from "../components/PlaneNormals";
import { ThreeJsComponent } from "./ThreeJsComponent";

export class WireframeCube implements ThreeJsComponent
{
	private frameMaterial = new Three.MeshBasicMaterial({color: 0x000000});
	

	private edgeLength : number;

	private wireFrame : Three.LineSegments;

	constructor(edgeLength : number)
	{
		this.edgeLength = edgeLength;

		var cubeGeometry = new Three.BoxGeometry(this.edgeLength, this.edgeLength, this.edgeLength);
		var edges = new Three.EdgesGeometry(cubeGeometry);
		this.wireFrame = new Three.LineSegments(edges, this.frameMaterial);
		this.wireFrame.position.set(0, 0, 0);
	}

	public Component() : Three.Object3D
	{
		return this.wireFrame;
	}
}