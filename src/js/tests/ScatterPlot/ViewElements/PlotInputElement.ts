import * as Three from "three";
import { IdGenerator } from "../../../util/IdGenerator";
import PlotNormals from "../PlotNormals";
import { timeHours } from "d3";

export class PlotInputElement
{
	element : JQuery<HTMLElement>;
	viewDirection : Three.Vector3;

	selectedCell : JQuery<HTMLElement> | null;

	public HighlightColour : string = "rgba(0,0,255,1)";

	public OnPlaneHighlighted : (planeNormal : Three.Vector3) => void = ()  => {};
	public OnPlaneUnHilighted : (planeNormal : Three.Vector3) => void = () => {};
	public OnPlaneSelected : (planeNormal : Three.Vector3) => void = () => {};

	constructor(viewDirection : Three.Vector3)
	{
		this.viewDirection = viewDirection;
		this.selectedCell = null;

		let gridContainerId = IdGenerator.Generate();
		let template = `<div style="display: flex;"><div style="flex: 1"></div><div id="${gridContainerId}" class="center-content" style="flex: 1"></div></div>`;
		let element = $(template);
		let gridContainer = element.find("#"+gridContainerId);

		gridContainer.append(this.buildGrid());

		this.element = element;
	}
	
	private buildGrid() : JQuery<HTMLElement>
	{
		const CELL_WIDTH = 50;
		const CELL_HEIGHT = 50;

		const TABLE_WIDTH = CELL_WIDTH * 3;
		const TABLE_HEIGHT = CELL_HEIGHT * 4;

		let table = $(
			`<table style="width: ${TABLE_WIDTH}px; height: ${TABLE_HEIGHT}px">
				<tr>
					<td></td>
					<td class="grid-select" data-plane="up"></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td class="grid-select" data-plane="away"></td>
					<td></td>
				</tr>
				<tr>
					<td class="grid-select" data-plane="left"></td>
					<td class="grid-select" data-plane="down"></td>
					<td class="grid-select" data-plane="right"></td>
				</tr>
				<tr>
					<td></td>
					<td class="grid-select" data-plane="towards"></td>
					<td></td>
				</tr>
			</table>`
		);

		let cells = table.find(".grid-select");

		cells.mouseenter((evt) =>
		{
			let cell = $(evt.target);

			if (this.selectedCell != null && cell != this.selectedCell)
				this.unHighlight(this.selectedCell);
			this.highlight(cell);
		});

		cells.mouseleave((evt) =>
		{
			let cell = $(evt.target);

			if (cell != this.selectedCell) this.unHighlight(cell);
			if (this.selectedCell != null && cell != this.selectedCell)
				this.highlight(this.selectedCell);
		});

		cells.click((evt) =>
		{
			let cell = $(evt.target);
			let plane = this.getCorrespondingPlaneNormal(cell);
			this.selectedCell = cell;

			this.OnPlaneSelected(plane);
		});

		return table;
	}

	private highlight(cell : JQuery<HTMLElement>) : void
	{
		cell.css("background-color", this.HighlightColour);
		this.OnPlaneHighlighted(this.getCorrespondingPlaneNormal(cell));
	}

	private unHighlight(cell : JQuery<HTMLElement>) : void
	{
		cell.css("background-color", "rgba(0,0,0,0)");
		this.OnPlaneUnHilighted(this.getCorrespondingPlaneNormal(cell));
	}

	public SelectedPlane() : Three.Vector3 | null
	{
		return this.selectedCell == null? null : this.getCorrespondingPlaneNormal(this.selectedCell);
	}

	private getCorrespondingPlaneNormal(gridCell : JQuery<HTMLElement>) : Three.Vector3
	{
		//TODO function binding the grid's data-plane to a normal vector relative to view direction
		// //Highlighting a plane relative to the camera, useful later
		// this.perspectivePlot.Cube.TogglePlaneHighlight(
		// 	this.perspectivePlot.scene, PlotNormals.CloserFrom(this.perspectivePlot.CameraNormal())
		// );

		let plane = gridCell.data("plane");
		let direction : Three.Vector3 | null = null;
		let closestPlane : Three.Vector3;

		if (plane == "up")
			direction = PlotNormals.UP;
		else if (plane == "down")
			direction = PlotNormals.DOWN;
		else if (plane == "away")
			direction = PlotNormals.AWAY;
		else if (plane == "towards")
			direction = PlotNormals.TOWARDS;
		else if (plane == "right")
			direction = PlotNormals.RIGHT;
		else if (plane == "left")
			direction = PlotNormals.LEFT;

		if (direction == null)
		{
			throw new Error("Grid cell has invalid data-plane property: " + plane);
		}

		closestPlane = this.closestPlane(direction);
		return closestPlane;
	}

	private closestPlane(normal : Three.Vector3) : Three.Vector3
	{
		let closestNormal = PlotNormals.ALL[0];
		let closestDotProduct = normal.dot(PlotNormals.ALL[0]);

		for (let i = 1; i < PlotNormals.ALL.length; i++)
		{
			let planeNormal = PlotNormals.ALL[i];
			let dotProduct = normal.dot(planeNormal);

			if (dotProduct > closestDotProduct)
			{
				closestNormal = planeNormal;
				closestDotProduct = dotProduct;
			}
		}

		return closestNormal;
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}
}