import { Conrec } from "../../../lib/conrec/conrec";
import { Point } from "../../../PlotData/Point";
import {ThreeJsComponent} from "./ThreeJsComponent";
import { Object3D, Group, LineBasicMaterial, BufferGeometry, Vector3, Line, LineLoop } from "three";
import { group } from "d3";
// let MarchingSquares : any = require("marchingsquares");

export class Isolines implements ThreeJsComponent
{
	private lineGroup : Group;

	constructor(points : Point[], axisLength : number)
	{
		let data = [];
		let xValues : number[] = [];
		let yValues : number[] = [];

		//Pseudo-HashMaps to collect unique values per axis
		let xDict : number[] = [];
		let yDict : number[] = [];
		// let zDict : number[] = [];

		let thresholds : number[] = [];
		let NUM_THRESHOLDS = 12;
		let THRESHOLD_INCREMENT = 1/NUM_THRESHOLDS;
		for (let i = -1; i <= 1; i +=THRESHOLD_INCREMENT)
		{
			thresholds.push(i);
		}

		//Sort by x-z in ascending order
		// points.sort((p1, p2) => 
		// 	p1.X == p2.X? p1.Z-p2.Z : p1.X - p2.X
		// );

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
		var material = new LineBasicMaterial( { color: 0x0000ff, linewidth: 1 } );
		let highestAxisValue = axisLength/2;

		for (let i = 0; i < polygons.length; i++)
		{
			let polygon = polygons[i];
			let linePoints : Vector3[] = [];
			let geometry = new BufferGeometry();

			for (let p = 0; p < polygon.length; p++)
			{
				let point = polygon[p];
				linePoints.push(new Vector3(point.x*highestAxisValue, 0, point.y*highestAxisValue));
			}

			geometry.setFromPoints(linePoints);
			this.lineGroup.add(new Line(geometry, material));
		}
	}

	Component(): Object3D
	{
		return this.lineGroup;
	}
}