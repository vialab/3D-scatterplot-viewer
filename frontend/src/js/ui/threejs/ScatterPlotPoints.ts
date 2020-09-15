import * as Three from "three";
import { Point } from "../../plotData/Point";
import { ThreeJsComponent } from "./ThreeJsComponent";

export class ScatterPlotPoints implements ThreeJsComponent
{
	private sphereGroup : Three.Group;

	//Static constructors to work around Typescript not allowing multiple constructors
	public static FromPoints(points : Point[], axisLength : number, pointRadius : number, padding : number = 0)
	{
		let element = new ScatterPlotPoints();

		let sphere = new Three.SphereGeometry(pointRadius, 10, 10);
		let material = new Three.MeshBasicMaterial({color: 0x0033ff});
		material.opacity = 0.7;
		material.transparent = true;
		element.createMesh(points, sphere, material, axisLength - padding);

		return element;
	}

	public static Clone(points : ScatterPlotPoints)
	{
		let element = new ScatterPlotPoints();
		element.sphereGroup = points.sphereGroup.clone();
		return element;
	}

	private constructor()
	{
		this.sphereGroup = new Three.Group();
	}

	private createMesh(positions : Point[], geometry : Three.SphereGeometry, material : Three.Material, axisLength : number)
	{
		let maxAxisValue = axisLength/2;

		for (let i = 0; i < positions.length; i++)
		{
			let point = positions[i];
			let worldX = point.X * maxAxisValue;
			let worldY = point.Y * maxAxisValue;
			let worldZ = point.Z * maxAxisValue;

			var sphere = new Three.Mesh(geometry, material);
			sphere.position.set(worldX, worldY, worldZ);

			this.sphereGroup.add(sphere);
		}
	}

	public Component() : Three.Object3D
	{
		return this.sphereGroup;
	}
}