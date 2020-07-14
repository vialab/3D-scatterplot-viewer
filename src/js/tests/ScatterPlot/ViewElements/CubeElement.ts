import * as Three from "three";
import PlotNormals from "../PlotNormals";

export class CubeElement
{
	private material = new Three.MeshBasicMaterial({color: 0x000000});

	private edgeLength : number;

	private wireFrame : Three.LineSegments;

	private topHighlight : Three.Mesh;
	private backHighlight : Three.Mesh;
	private bottomHighlight : Three.Mesh;
	private frontHighlight : Three.Mesh;
	private leftHighlight : Three.Mesh;
	private rightHighlight : Three.Mesh;

	private highlightDirections : PlaneHighlightBinding[];
	private activeHighlights : Three.Mesh[];

	private highlightColour = 0xffff00;

	constructor(edgeLength : number)
	{
		this.edgeLength = edgeLength;

		//Wire Frame
		var cubeGeometry = new Three.BoxGeometry(this.edgeLength, this.edgeLength, this.edgeLength);
		var edges = new Three.EdgesGeometry(cubeGeometry);
		this.wireFrame = new Three.LineSegments(edges, this.material);
		this.wireFrame.position.set(0, 0, 0);

		//Highlights
		var highlightPlaneGeometry = new Three.PlaneGeometry(this.edgeLength, this.edgeLength);
		var highlightMaterial = new Three.MeshBasicMaterial( {color: this.highlightColour, side: Three.DoubleSide} );
		highlightMaterial.transparent = true;
		highlightMaterial.opacity = 0.5;

		var top = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		top.position.set(0, this.edgeLength/2, 0);
		top.rotation.x = 1.5708;
		this.topHighlight = top;

		var back = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		back.position.set(0, 0, -this.edgeLength/2);
		this.backHighlight = back;

		var bottom = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		bottom.position.set(0, -this.edgeLength/2, 0);
		bottom.rotation.x = 1.5708;
		this.bottomHighlight = bottom;

		var front = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		front.position.set(0, 0, this.edgeLength/2);
		this.frontHighlight = front;

		var left = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		left.position.set(-this.edgeLength/2, 0, 0);
		left.rotation.y = 1.5708;
		this.leftHighlight = left;

		var right = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		right.position.set(this.edgeLength/2, 0, 0);
		right.rotation.y = 1.5708;
		this.rightHighlight = right;

		this.highlightDirections = [
			{Normal: PlotNormals.UP, Highlight: this.topHighlight},
			{Normal: PlotNormals.DOWN, Highlight: this.bottomHighlight},
			
			{Normal: PlotNormals.TOWARDS, Highlight: this.frontHighlight},
			{Normal: PlotNormals.AWAY, Highlight: this.backHighlight},
			
			{Normal: PlotNormals.RIGHT, Highlight: this.rightHighlight},
			{Normal: PlotNormals.LEFT, Highlight: this.leftHighlight},
		];
		this.activeHighlights = [];
	}

	public WireFrame() : Three.LineSegments
	{
		return this.wireFrame;
	}

	public TogglePlaneHighlight(scene : Three.Scene, direction : Three.Vector3)
	{
		let mesh = this.getHighlight(direction);

		if (this.isHighlighted(mesh))
		{
			scene.remove(mesh);
			this.removeActiveHighlight(mesh);
		}
		else
		{
			scene.add(mesh);
			this.activeHighlights.push(mesh);
		}
	}

	private removeActiveHighlight(mesh : Three.Mesh) : void
	{
		for (let i = 0; i < this.activeHighlights.length; i++)
		{
			if (this.activeHighlights[i] == mesh)
			{
				this.activeHighlights.splice(i, 1);
				break;
			}
		}
	}

	private getHighlight(normal : Three.Vector3) : Three.Mesh
	{
		for (let i = 0; i < this.highlightDirections.length; i++)
		{
			let highlight = this.highlightDirections[i];
			if (highlight.Normal.equals(normal))
				return highlight.Highlight;
		}

		throw new Error("Invalid plane to highlight: " + normal);
	}

	private isHighlighted(highlight : Three.Mesh) : boolean
	{
		return this.activeHighlights.findIndex((plane) => plane == highlight) != -1;
	}
}

interface PlaneHighlightBinding
{
	Normal : Three.Vector3,
	Highlight : Three.Mesh
}