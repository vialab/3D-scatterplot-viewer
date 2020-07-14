import * as Three from "three";
import { PlotPoint } from "../PlotPoint";

export class PointsElement
{
	private material = new Three.MeshBasicMaterial({color: 0x0033ff});
	private spheres : Three.Mesh[];

	constructor(points : PlotPoint[], pointRadius : number)
	{
		var dotGeometry = new Three.SphereGeometry(pointRadius, 10, 10);
		this.spheres = [];

		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];

			var sphere = new Three.Mesh(dotGeometry, this.material);
			sphere.position.set(point.X, point.Y, point.Z);

			this.spheres[i] = sphere;
		}
	}

	public Points() : Three.Mesh[]
	{
		return this.spheres;
	}
}