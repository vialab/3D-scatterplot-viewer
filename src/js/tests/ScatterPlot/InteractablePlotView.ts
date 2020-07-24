import * as Three from "three";

import { TaskDisplay, UserInterface } from "../../io";
import { Point } from "../../PlotData/Point";
import { IdGenerator } from "../../util/IdGenerator";
import { OrbitControls } from 'three-orbitcontrols-ts';
import GraphPlaneNormals from "../../io/ui/components/PlaneNormals";
import { ToggleOrthographicButton } from "../../io/ui/components/ToggleOrthographicButton";
import { Vector3, Vector2 } from "three";
import { RandomPlane } from "./RandomPlane";
import { Graph } from "../../io/ui/components/Graph";
import { PlaneSelector } from "../../io/ui/components/PlaneSelector";
import { FixedRotationGraph } from "../../io/ui/components/FixedRotationGraph";
import { InteractableGraph } from "../../io/ui/components/InteractableGraph";
import { ScatterPlotPoints } from "../../io/ui/threejs/ScatterPlotPoints";

export class InteractablePlotView extends TaskDisplay
{
	public CorrectPlane : Three.Vector3;
	private planeView : Graph;
	private fullView : Graph;
	private inputGrid : PlaneSelector;
	
	private toggleOrthoButton : ToggleOrthographicButton;

	constructor(points : Point[], axisLength : number)
	{
		super();

		let planeViewPoints = ScatterPlotPoints.FromPoints(points, axisLength, 5, 20);
		let fullViewPoints = ScatterPlotPoints.Clone(planeViewPoints);

		let planeSelection = RandomPlane.Select();
		this.CorrectPlane = planeSelection.Normal;
		let planeViewRotation = planeSelection.Rotation;
		this.planeView = new FixedRotationGraph(planeViewPoints, axisLength, planeViewRotation);
		this.planeView.UseOrthographicCamera();

		let maxRotation = 45;
		let initialRotation = new Three.Vector2(
			Math.random() * (360 - maxRotation),
			Math.random() * (180 - maxRotation)
		);
		let rotationRange = new Three.Vector2(maxRotation, maxRotation);
		this.fullView = new InteractableGraph(fullViewPoints, axisLength, initialRotation, rotationRange);
		this.fullView.UsePerspectiveCamera();

		this.toggleOrthoButton = new ToggleOrthographicButton(this.fullView, false);

		this.inputGrid = new PlaneSelector(this.fullView.CameraNormal());

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
		screen.ComparisonViewContainer().append(this.toggleOrthoButton.Element());
		
		screen.PromptContainer().append(this.inputGrid.Element());

		this.planeView.RenderOnce();
		this.fullView.RenderContinuously();
	}
}