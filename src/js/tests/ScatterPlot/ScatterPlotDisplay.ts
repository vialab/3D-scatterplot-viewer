import * as Three from "three";

import { TaskDisplay, UserInterface } from "../../io";
import { PlotPoint } from "./PlotPoint";
import { IdGenerator } from "../../util/IdGenerator";
import { axisBottom, select } from "d3";

export class ScatterPlotDisplay extends TaskDisplay
{
	private points : PlotPoint[];

	private width : number;
	private height : number;
	private depth : number;

	private camera : Three.PerspectiveCamera;
	private orthoCamera : Three.OrthographicCamera;

	private renderer3D : Three.WebGLRenderer;
	private rendererOrtho : Three.WebGLRenderer;

	private scene : Three.Scene;

	private boxMaterial = new Three.MeshBasicMaterial({color: 0x000000});
	private sphereMaterial = new Three.MeshBasicMaterial({color: 0x0033ff});

	private topHighlight : Three.Mesh;
	private backHighlight : Three.Mesh;
	private bottomHighlight : Three.Mesh;
	private frontHighlight : Three.Mesh;
	private leftHighlight : Three.Mesh;
	private rightHighlight : Three.Mesh;

	private selectedHighlight : Three.Mesh | null;
	private selectedCell : JQuery<HTMLElement> | null;
	private hoveredHighlight : Three.Mesh | null;

	private highlightColour = 0xffff00;

	private onPlaneSelected : (x : number, y : number, z : number) => void;

	constructor(points : PlotPoint[], onPlaneSelected : (x : number, y : number, z : number) => any)
	{
		super();

		this.points = points;
		this.onPlaneSelected = onPlaneSelected;

		this.selectedHighlight = null;
		this.selectedCell = null;
		this.hoveredHighlight = null;

		this.width = 600;
		this.height = 600;
		this.depth = 600;

		let camera = new Three.PerspectiveCamera(75, this.width/this.height, 0.1, this.depth*5);
		camera.position.z = this.depth + (this.depth * 0.2);
		camera.lookAt(0,0,0);
		this.camera = camera;

		let orthoScale = 0.6;
		let orthoCamera = new Three.OrthographicCamera(
			-this.width * orthoScale,
			this.width * orthoScale,
			this.height * orthoScale,
			-this.height * orthoScale,
			0.1,
			this.depth*5
		);
		orthoCamera.position.z = this.depth + (this.depth * 0.2);
		this.orthoCamera = orthoCamera;
		
		let scene = new Three.Scene();
		this.scene = scene;
		this.setupScene();
		
		var highlightPlaneGeometry = new Three.PlaneGeometry(this.width, this.height);
		var highlightMaterial = new Three.MeshBasicMaterial( {color: this.highlightColour, side: Three.DoubleSide} );
		highlightMaterial.transparent = true;
		highlightMaterial.opacity = 0.5;

		var top = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		top.position.set(0, this.height/2, 0);
		top.rotation.x = 1.5708;
		this.topHighlight = top;

		var back = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		back.position.set(0, 0, -this.depth/2);
		this.backHighlight = back;

		var bottom = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		bottom.position.set(0, -this.height/2, 0);
		bottom.rotation.x = 1.5708;
		this.bottomHighlight = bottom;

		var front = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		front.position.set(0, 0, this.depth/2);
		this.scene.add(front);
		this.scene.remove(front);
		this.frontHighlight = front;

		var left = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		left.position.set(-this.width/2, 0, 0);
		left.rotation.y = 1.5708;
		this.leftHighlight = left;

		var right = new Three.Mesh(highlightPlaneGeometry, highlightMaterial);
		right.position.set(this.width/2, 0, 0);
		right.rotation.y = 1.5708;
		this.rightHighlight = right;

		let renderer = new Three.WebGLRenderer();
		renderer.setSize(this.width, this.height);
		renderer.setClearColor(0xffffff);
		this.renderer3D = renderer;

		let orthoRenderer = new Three.WebGLRenderer();
		orthoRenderer.setSize(this.width, this.height);
		orthoRenderer.setClearColor(0xffffff);
		this.rendererOrtho = orthoRenderer;
	}

	private setupScene() : void
	{
		this.addBoxToScene();
		this.addPointsToScene();	
	}

	private addBoxToScene() : void
	{
		var geometry = new Three.BoxGeometry(this.width, this.height, this.depth);
		var wireframe = new Three.EdgesGeometry(geometry);
		var lines = new Three.LineSegments(wireframe, this.boxMaterial);
		lines.position.set(0, 0, 0);
		this.scene.add(lines);
	}

	private addPointsToScene() : void
	{
		var dotGeometry = new Three.SphereGeometry(5, 10, 10);

		for (let i = 0; i < this.points.length; i++)
		{
			let point = this.points[i];	
			var sphere = new Three.Mesh(dotGeometry, this.sphereMaterial);
			sphere.position.set(point.X, point.Y, point.Z);
			this.scene.add(sphere);
		}
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();
		this.AppendPlots(screen);
		this.AppendInput(screen);

		this.render3D();
		this.renderOrtho();
	}

	private AppendPlots(screen : UserInterface) : void
	{
		screen.ComparisonViewContainer().append(this.renderer3D.domElement);
		screen.OriginalViewContainer().append(this.rendererOrtho.domElement);
	}

	private AppendInput(screen : UserInterface) : void
	{
		let selectorContainerId = IdGenerator.Generate();
		let template = `<div style="display: flex;"><div style="flex: 1"></div><div id="${selectorContainerId}" class="center-content" style="flex: 1"></div></div>`;

		screen.PromptContainer().append(template);
		$("#"+selectorContainerId).append(this.buildGrid());
	}
	
	private buildGrid() : JQuery<HTMLElement>
	{
		const CELL_WIDTH = 50;
		const CELL_HEIGHT = 50;

		const TABLE_WIDTH = CELL_WIDTH * 3;
		const TABLE_HEIGHT = CELL_HEIGHT * 4;

		let table = $(`<table style="width: ${TABLE_WIDTH}px; height: ${TABLE_HEIGHT}px"></table>`);

		for (let  x = 0; x < 4; x++)
		{
			let row = $(`<tr></tr>`);

			for (let y = 0; y < 3; y++)
			{
				let cell = $("<td></td>");

				if (x == 2 || y == 1)
				{
					let highlight : Three.Mesh = <Three.Mesh>this.selectHighlightFromGrid(x, y);
					
					cell.mouseenter(() =>
					{
						if (this.selectedHighlight != null && this.selectedCell != null)
						{
							this.disableHighlight(this.selectedCell, this.selectedHighlight);
						}

						this.enableHighlight(cell, highlight);
					});

					cell.mouseleave(() =>
					{
						this.disableHighlight(cell, highlight);

						if (this.selectedHighlight != null && this.selectedCell != null)
						{
							this.enableHighlight(this.selectedCell, this.selectedHighlight);
						}
					});

					cell.click(() =>
					{
						this.selectedHighlight = highlight;
						this.selectedCell = cell;

						let coordinate = this.gridCoordinateToPlane(x, y);
						this.onPlaneSelected(coordinate.x, coordinate.y, coordinate.z);
					});

					cell.css("border", "solid 1px");
				}

				row.append(cell);
			}

			table.append(row);
		}

		return table;
	}
	
	private selectHighlightFromGrid(x : number, y : number) : Three.Mesh | null
	{
		let planes = [
			[null, this.topHighlight, null],
			[null, this.backHighlight, null],
			[this.leftHighlight, this.bottomHighlight, this.rightHighlight],
			[null, this.frontHighlight, null]
		];

		return planes[x][y];
	}

	private enableHighlight(cell : JQuery<HTMLElement>, plane : Three.Mesh)
	{
		cell.css("background-color", "#" + this.highlightColour.toString(16));
		this.scene.add(plane);
		this.render3D();
	}

	private disableHighlight(cell : JQuery<HTMLElement>, plane : Three.Mesh)
	{
		cell.css("background-color", "rgba(0,0,0,0)");
		this.scene.remove(plane);
		this.render3D();
	}

	private gridCoordinateToPlane(x : number, y : number) : Three.Vector3
	{
		let planeZ = 0;

		if (x == 1 && y == 1)
			planeZ = -1;
		else if (x == 1 && y == 4)
			planeZ = 1;

		return new Three.Vector3(x - 1, y - 1, planeZ);
	}

	private render3D() : void
	{
		this.renderer3D.render(this.scene, this.camera);
	}

	private renderOrtho() : void
	{
		this.rendererOrtho.render(this.scene, this.orthoCamera);
	}
}