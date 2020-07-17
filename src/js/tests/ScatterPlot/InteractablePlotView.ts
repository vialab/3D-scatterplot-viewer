import * as Three from "three";

import { TaskDisplay, UserInterface } from "../../io";
import { PlotPoint } from "./PlotPoint";
import { IdGenerator } from "../../util/IdGenerator";
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ScatterPlotElement } from "./ViewElements/ScatterPlotElement";
import PlotNormals from "./PlotNormals";
import { PlotInputElement } from "./ViewElements/PlotInputElement";
import { InteractableScatterPlotElement } from "./ViewElements/InteractableScatterPlotElement";
import { ToggleOrthographicButton } from "./ViewElements/ToggleOrthographicButton";
import { FixedRotationScatterPlotElement } from "./ViewElements/FixedRotationScatterPlotElement";
import { Vector3, Vector2 } from "three";
import { RandomPlane } from "./RandomPlane";

export class InteractablePlotView extends TaskDisplay
{
	public CorrectPlane : Three.Vector3;
	private planeView : ScatterPlotElement;
	private fullView : ScatterPlotElement;
	private inputGrid : PlotInputElement;
	
	private toggleOrthoButton : ToggleOrthographicButton;

	constructor(points : PlotPoint[], edgeLength : number)
	{
		super();

		let planeSelection = RandomPlane.Select();
		this.CorrectPlane = planeSelection.Normal;
		let planeViewRotation = planeSelection.Rotation;
		this.planeView = new FixedRotationScatterPlotElement(points, edgeLength, 5, planeViewRotation);
		this.planeView.UseOrthographicCamera();

		let maxRotation = 15;
		let initialRotation = new Three.Vector2(
			Math.random() * (355 - maxRotation),
			Math.random() * (175 - maxRotation)
		);
		this.fullView = new InteractableScatterPlotElement(points, edgeLength, 5, initialRotation, maxRotation);
		this.fullView.UsePerspectiveCamera();

		this.toggleOrthoButton = new ToggleOrthographicButton(this.fullView, false);

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
		// this.planeView.TogglePlaneHighlight(planeNormal);
		// this.planeView.RenderOnce();
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();

		screen.OriginalViewContainer().append(this.planeView.Element());
		screen.ComparisonViewContainer().append(this.fullView.Element());
		screen.ComparisonViewContainer().append(this.toggleOrthoButton.Element());
		
		screen.PromptContainer().append(this.inputGrid.Element());

		this.planeView.RenderOnce();
		this.fullView.RenderContinuously();
	}
}