import * as Three from "three";

import { TaskDisplay, UserInterface } from "../../io";
import { PlotPoint } from "./PlotPoint";
import { IdGenerator } from "../../util/IdGenerator";
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ScatterPlotElement } from "./ViewElements/ScatterPlotElement";
import PlotNormals from "./PlotNormals";
import { PlotInputElement } from "./ViewElements/PlotInputElement";
import { InteractableScatterPlotElement } from "./ViewElements/InteractableScatterPlotElement";

export class ScatterPlotDisplay extends TaskDisplay
{
	private onPlaneSelected : (x : number, y : number, z : number) => void;
	private planeView : ScatterPlotElement;
	private fullView : ScatterPlotElement;
	private inputGrid : PlotInputElement;

	constructor(points : PlotPoint[], onPlaneSelected : (x : number, y : number, z : number) => any)
	{
		super();
		this.onPlaneSelected = onPlaneSelected;

		this.planeView = new ScatterPlotElement(points, 600, 5);
		this.planeView.UseOrthographicCamera();

		let initialRotation = new Three.Vector2(45, 75);
		let maxRotation = 15;
		this.fullView = new InteractableScatterPlotElement(points, 600, 5, initialRotation, maxRotation);

		this.inputGrid = new PlotInputElement(this.fullView.CameraNormal());

		this.inputGrid.OnPlaneHighlighted = (planeNormal : Three.Vector3) =>
		{
			this.toggleHighlight(planeNormal);
		}

		this.inputGrid.OnPlaneUnHilighted = (planeNormal : Three.Vector3) =>
		{
			this.toggleHighlight(planeNormal);
		}
	}

	protected toggleHighlight(planeNormal : Three.Vector3)
	{
		this.fullView.TogglePlaneHighlight(planeNormal);
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();

		screen.OriginalViewContainer().append(this.planeView.Element());
		screen.ComparisonViewContainer().append(this.fullView.Element());
		
		screen.PromptContainer().append(this.inputGrid.Element());

		this.planeView.RenderOnce();
		this.fullView.RenderContinuously();
	}
}