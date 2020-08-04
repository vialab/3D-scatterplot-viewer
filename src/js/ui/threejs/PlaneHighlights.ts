import * as Three from "three";
import GraphPlaneNormals from "../components/PlaneNormals";

export class PlaneHighlights
{
	private highlightMaterial = new Three.MeshBasicMaterial( {color: 0xffff00, side: Three.DoubleSide} );

	private topHighlight : Three.Mesh;
	private backHighlight : Three.Mesh;
	private bottomHighlight : Three.Mesh;
	private frontHighlight : Three.Mesh;
	private leftHighlight : Three.Mesh;
	private rightHighlight : Three.Mesh;

	private highlightDirections : PlaneHighlightBinding[];
	private activeHighlights : Three.Mesh[];

	constructor(edgeLength : number)
	{
		//Highlights
		var highlightPlaneGeometry = new Three.PlaneGeometry(edgeLength, edgeLength);
		
		this.highlightMaterial.transparent = true;
		this.highlightMaterial.opacity = 0.5;

		var top = new Three.Mesh(highlightPlaneGeometry, this.highlightMaterial);
		top.position.set(0, edgeLength/2, 0);
		top.rotation.x = 1.5708;
		this.topHighlight = top;

		var back = new Three.Mesh(highlightPlaneGeometry, this.highlightMaterial);
		back.position.set(0, 0, -edgeLength/2);
		this.backHighlight = back;

		var bottom = new Three.Mesh(highlightPlaneGeometry, this.highlightMaterial);
		bottom.position.set(0, -edgeLength/2, 0);
		bottom.rotation.x = 1.5708;
		this.bottomHighlight = bottom;

		var front = new Three.Mesh(highlightPlaneGeometry, this.highlightMaterial);
		front.position.set(0, 0, edgeLength/2);
		this.frontHighlight = front;

		var left = new Three.Mesh(highlightPlaneGeometry, this.highlightMaterial);
		left.position.set(-edgeLength/2, 0, 0);
		left.rotation.y = 1.5708;
		this.leftHighlight = left;

		var right = new Three.Mesh(highlightPlaneGeometry, this.highlightMaterial);
		right.position.set(edgeLength/2, 0, 0);
		right.rotation.y = 1.5708;
		this.rightHighlight = right;

		this.highlightDirections = [
			{Normal: GraphPlaneNormals.UP, Highlight: this.topHighlight},
			{Normal: GraphPlaneNormals.DOWN, Highlight: this.bottomHighlight},
			
			{Normal: GraphPlaneNormals.TOWARDS, Highlight: this.frontHighlight},
			{Normal: GraphPlaneNormals.AWAY, Highlight: this.backHighlight},
			
			{Normal: GraphPlaneNormals.RIGHT, Highlight: this.rightHighlight},
			{Normal: GraphPlaneNormals.LEFT, Highlight: this.leftHighlight},
		];
		this.activeHighlights = [];
	}

	public SetHighlightColour(color : number | string | Three.Color)
	{
		this.highlightMaterial.setValues({color: color});
		this.highlightMaterial.needsUpdate = true;
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