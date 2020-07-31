import { Conrec } from "../../../lib/conrec/conrec";
import { Point } from "../../../PlotData/Point";
import {ThreeJsComponent} from "./ThreeJsComponent";
import { Object3D, Group, Vector3, Scene, WebGLRenderer, WebGLRenderTarget, AmbientLight, Color, OrthographicCamera, LineBasicMaterial, Geometry, Line, BufferGeometry, BufferAttribute } from "three";
import { GraphPlane } from "./GraphPlane";
import { Graph } from "../components/Graph";

export class Isolines implements ThreeJsComponent
{
	private lineGroup : Group;
	private renderer : WebGLRenderer;
	private plane : Object3D;

	constructor(points : Point[], axisLength : number)
	{
		this.renderer = new WebGLRenderer();
		this.renderer.setSize(axisLength, axisLength);
		this.renderer.setClearColor(0xffffff);

		let plane = GraphPlane.FromPoints(points, axisLength);
		let planeComponent = plane.Component();
		// planeComponent.rotateX(1.5708);
		this.plane = planeComponent;

		let data = [];
		let xValues : number[] = [];
		let yValues : number[] = [];

		//Pseudo-HashMaps to collect unique values per axis
		let xDict : number[] = [];
		let yDict : number[] = [];

		//Order along z-x axis ascending order
		points.sort((p1, p2) =>
			p1.Z == p2.Z? p1.X-p2.X : p1.Z-p2.Z
		);

		let thresholds : number[] = [];
		let NUM_THRESHOLDS = 20;
		let THRESHOLD_INCREMENT = 2/NUM_THRESHOLDS;
		for (let i = -1; i <= 1; i +=THRESHOLD_INCREMENT)
		{
			thresholds.push(i);
		}

		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			let dataValue = point.Y;

			data.push(dataValue);

			xDict[point.X] = 0;
			yDict[point.Z] = 0;
		}

		let xKeys = Object.keys(xDict);
		for (let i = 0; i < xKeys.length; i++)
		{
			xValues.push(Number(xKeys[i]));
		}

		let yKeys = Object.keys(yDict);
		for (let i = 0; i < yKeys.length; i++)
		{
			yValues.push(Number(yKeys[i]));
		}
		
		// thresholds.sort((a, b) => a-b);

		let conrec = new Conrec();
		conrec.contour(data, 0, xValues.length-1, 0, yValues.length-1, xValues, yValues, thresholds);

		let polygons = conrec.contourList();
		this.lineGroup = new Group();
		var material = new LineBasicMaterial( { linewidth: 3, vertexColors: true } );
		let highestAxisValue = axisLength/2;

		let heatmap = this.createTexture(points, axisLength);

		for (let i = 0; i < polygons.length; i++)
		{
			let polygon = polygons[i];
			let linePoints : Vector3[] = [];
			let averageColor : Color = new Color(0,0,0);
			let geometry = new BufferGeometry();

			for (let p = 0; p < polygon.length; p++)
			{
				let point = polygon[p];
				let worldPoint = new Vector3(point.x*highestAxisValue, 0, point.y*highestAxisValue);
				let screenX = Math.round(worldPoint.x) + highestAxisValue;
				let screenY = Math.round(worldPoint.z) + highestAxisValue;
				let pointColor = heatmap[screenX][screenY];
				
				linePoints.push(worldPoint);

				averageColor.r += pointColor.r;
				averageColor.g += pointColor.g;
				averageColor.b += pointColor.b;
			}

			averageColor.r /= linePoints.length;
			averageColor.g /= linePoints.length;
			averageColor.b /= linePoints.length;

			let colors = new Uint8Array(linePoints.length*3);
			for (let i = 0; i < linePoints.length; i++)
			{
				let point = linePoints[i];
				
				let startIndex = i*3;
				colors[startIndex] = averageColor.r;
				colors[startIndex+1] = averageColor.g;
				colors[startIndex+2] = averageColor.b;
			}

			// let curve = new CatmullRomCurve3(linePoints, false, "centripetal", 1);
			geometry.setFromPoints(linePoints);
			geometry.setAttribute("color", new BufferAttribute(colors, 3, true));
			this.lineGroup.add(new Line(geometry, material));
		}
	}

	private createTexture(points : Point[], axisLength : number) : Color[][]
	{
		
		let target = new WebGLRenderTarget(axisLength, axisLength);
		let orthographicSideLength = axisLength/2;
		let orthographicCamera = new OrthographicCamera(
			-orthographicSideLength,
			orthographicSideLength,
			orthographicSideLength,
			-orthographicSideLength,
			0.1, axisLength * 3
		);
		orthographicCamera.position.z = axisLength;

		let scene = new Scene();
		let plane = GraphPlane.FromPoints(points, axisLength);

		let planeComponent = plane.Component();
		planeComponent.rotateX(1.5708);
		planeComponent.rotateY(1.5708);

		scene.add(planeComponent);
		scene.add(new AmbientLight(new Color(1,1,1), 1));

		this.renderer.render(scene, orthographicCamera);
		this.renderer.setRenderTarget(target);
		this.renderer.render(scene, orthographicCamera);

		const buffer = new Uint8Array(axisLength * axisLength * 4);
		this.renderer.readRenderTargetPixels(target, 0, 0, axisLength, axisLength, buffer);

		let colors : Color[][] = [];
		for (let x = 0; x < axisLength; x++)
		{
			let columnColors : Color[] = [];

			for (let y = 0; y < axisLength; y++)
			{
				let index = x*axisLength*4+y*4;
				let red = buffer[index];
				let green = buffer[index+1];
				let blue = buffer[index+2];

				columnColors.push(new Color(red, green, blue));
			}

			colors.push(columnColors);
		}

		return colors;
	}
	Renderer()
	{
		return this.renderer;
	}
	Component(): Object3D
	{
		return this.lineGroup;
	}
}