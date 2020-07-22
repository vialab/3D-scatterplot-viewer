import * as Three from "three";
import Delaunator = require("delaunator");

import { TaskDisplay, UserInterface } from "../../io";
import { IdGenerator } from "../../util/IdGenerator";
import { PlotPoint } from "../ScatterPlot/PlotPoint";
import { Vector3, BufferGeometry, BufferAttribute } from "three";
import { OrbitControls } from "three-orbitcontrols-ts";

export class PlaneDisplay extends TaskDisplay
{
	private vectors : Three.Vector3[];

	private minY : number;
	private maxY : number;

	private width : number;
	private height : number;

	//TODO can we calculate this based on range of x, y, z?
	private viewDistance : number;
	
	constructor(points : PlotPoint[], width : number, height : number, viewDistance : number)
	{
		super();

		this.width = width;
		this.height = height;
		this.viewDistance = viewDistance;

		this.vectors = [];
		let minY = 9999999999;
		let maxY = -minY;
		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];

			if (point.Y > maxY)
				maxY = point.Y;
			else if (point.Y < minY)
				minY = point.Y;

			this.vectors.push(new Three.Vector3(point.X, point.Y, point.Z));
		}

		this.minY = minY;
		this.maxY = maxY;
	}

	public GetWidth() : number
	{
		return this.width;
	}

	public GetHeight() : number
	{
		return this.height;
	}

	public Display(screen: UserInterface): void
	{
		var camera = new Three.PerspectiveCamera(50,1,0.1,10000);
		// var camera = new Three.OrthographicCamera(-this.width/2, this.width/2, this.height/2, -this.height/2, 0.1, 10000);
		camera.position.set(0, 100, this.viewDistance);

		let scene = new Three.Scene();

		var renderer = new Three.WebGLRenderer();
		renderer.setClearColor("rgb(255, 255, 255)");
		renderer.setSize(this.width, this.height);
		
		let indices = Delaunator.from(
			this.vectors,
			(v:Vector3) => v.x,
			(v:Vector3) => v.z
		);
		console.log(indices);
		
		let geometry = new BufferGeometry();
		geometry.setFromPoints(this.vectors);
		geometry.setIndex(new BufferAttribute(indices.triangles, 1, false));

		let range = this.maxY-this.minY;
		let colors = new Uint8Array(this.vectors.length*3);

		for (let i = 0; i < this.vectors.length; i++)
		{
			let colorIndex = i*3;

			let point = this.vectors[i];
			let color = new Three.Color( 0x0000ff );
			color.setHSL( 0.7 * (this.maxY - point.y) / range, 1, 0.5 );
			
			colors[colorIndex] = color.r;
			colors[colorIndex+1] = color.g;
			colors[colorIndex+2] = color.b;
		}

		geometry.setAttribute("color", new BufferAttribute(colors, 3, false));

		//Create Mesh
		// wireMaterial.map.repeat.set( segments, segments );
		var vertexColorMaterial  = new Three.MeshBasicMaterial( { vertexColors: true, side: Three.DoubleSide } );
		let graphMesh = new Three.Mesh( geometry, vertexColorMaterial );
		scene.add(graphMesh);
		camera.lookAt(graphMesh.position);
		
		screen.ViewModeContent();
		screen.ContentContainer().append(renderer.domElement);

		var orbit = new OrbitControls(camera, renderer.domElement);
		let render = () => {
			requestAnimationFrame(render);
			orbit.update();
			renderer.render(scene, camera);
		}

		render();
	}
	
}