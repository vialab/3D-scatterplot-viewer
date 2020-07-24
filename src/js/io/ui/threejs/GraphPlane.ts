import { ThreeJsComponent } from "./ThreeJsComponent";
import { Object3D, Vector3, BufferGeometry, Color, BufferAttribute, Mesh, MeshBasicMaterial, DoubleSide } from "three";
import Delaunator = require("delaunator");
import { Point } from "../../../PlotData/Point";
import { Graph } from "../components/Graph";

export class GraphPlane implements ThreeJsComponent
{
	private mesh : Mesh;

	public static FromPoints(points : Point[], axisLength : number)
	{
		let maxValue = axisLength/2;

		let vectors = [];
		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			vectors.push(new Vector3(point.X * maxValue, point.Y * maxValue, point.Z * maxValue));
		}

		let indices = Delaunator.from(
			vectors,
			(v:Vector3) => v.x,
			(v:Vector3) => v.z
		);
		
		let geometry = new BufferGeometry();
		geometry.setFromPoints(vectors);
		geometry.setIndex(new BufferAttribute(indices.triangles, 1, false));

		geometry.computeBoundingBox();
		let minY = <number>geometry.boundingBox?.min.y;
		let maxY = <number>geometry.boundingBox?.max.y;
		let range = maxY-minY;

		let colors = new Uint8Array(vectors.length*3);

		for (let i = 0; i < vectors.length; i++)
		{
			let colorIndex = i*3;

			let point = vectors[i];
			let color = new Color( 0x0000ff );
			color.setHSL( 0.7 * (maxY - point.y) / range, 1, 0.5 );
			
			colors[colorIndex] = color.r;
			colors[colorIndex+1] = color.g;
			colors[colorIndex+2] = color.b;
		}

		geometry.setAttribute("color", new BufferAttribute(colors, 3, false));

		var vertexColorMaterial  = new MeshBasicMaterial( { vertexColors: true, side: DoubleSide } );
		let mesh = new Mesh( geometry, vertexColorMaterial );

		let plane = new GraphPlane(mesh);

		return plane;
	}

	public static Clone(plane : GraphPlane) : GraphPlane
	{
		let copy = new GraphPlane(plane.mesh.clone());
		return copy;
	}

	private constructor(mesh : Mesh)
	{
		this.mesh = mesh;
	}

	Component(): Object3D
	{
		return this.mesh;
	}
}