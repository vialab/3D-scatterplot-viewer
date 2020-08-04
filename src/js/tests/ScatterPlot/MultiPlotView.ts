import * as Three from "three";
import { TaskDisplay, UserInterface } from "../../io";
import { Point } from "../../PlotData/Point";
import { ToggleOrthographicButton } from "../../ui/components/ToggleOrthographicButton";
import { IdGenerator } from "../../util/IdGenerator";
import { RandomPlane } from "./RandomPlane";
import { Graph } from "../../ui/components/Graph";
import { PlaneSelector } from "../../ui/components/PlaneSelector";
import { FixedRotationGraph } from "../../ui/components/FixedRotationGraph";
import { ScatterPlotPoints } from "../../ui/threejs/ScatterPlotPoints";
import { WireframeCube } from "../../ui/threejs/WireFrameCube";
import { axisLeft } from "d3";

export class MultiPlotView extends TaskDisplay
{
	private planeView : Graph;
	private firstAngleView : Graph;
	private secondAngleView : Graph;
	private inputGrid : PlaneSelector;

	private toggleOrthoButton : ToggleOrthographicButton;

	constructor(points : Point[], edgeLength : number)
	{
		super();

		let planeSelection = RandomPlane.Select();

		let planeViewPoints = ScatterPlotPoints.FromPoints(points, edgeLength, 5, 20);
		let firstRotationPoints = ScatterPlotPoints.Clone(planeViewPoints);
		let secondRotationPoints = ScatterPlotPoints.Clone(planeViewPoints);

		//TODO only currently displays view down -z axis
		let planeViewBorder = new WireframeCube(edgeLength);
		this.planeView = new FixedRotationGraph(planeViewBorder, planeViewPoints, edgeLength, planeSelection.Rotation);
		this.planeView.UseOrthographicCamera();

		let firstRotationBorder = new WireframeCube(edgeLength);
		let firstRotation = new Three.Vector2(Math.random() * 360, Math.random() * 180);
		this.firstAngleView = new FixedRotationGraph(firstRotationBorder, firstRotationPoints, edgeLength, firstRotation);
		this.firstAngleView.UsePerspectiveCamera();

		let secondRotationBorder = new WireframeCube(edgeLength);
		let secondRotation = new Three.Vector2(Math.random() * 360, Math.random() * 180);
		this.secondAngleView = new FixedRotationGraph(secondRotationBorder, secondRotationPoints, edgeLength, secondRotation);
		this.secondAngleView.UsePerspectiveCamera();

		this.toggleOrthoButton = new ToggleOrthographicButton([this.firstAngleView, this.secondAngleView], false);

		this.inputGrid = new PlaneSelector(this.firstAngleView.CameraNormal());
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
		this.firstAngleView.TogglePlaneHighlight(planeNormal);
		this.secondAngleView.TogglePlaneHighlight(planeNormal);
	}

	public Display(screen: UserInterface): void
	{
		let planeViewContainerId = IdGenerator.Generate();
		let firstRotationContainerId = IdGenerator.Generate();
		let secondRotationContainerId = IdGenerator.Generate();
		let inputContainerId = IdGenerator.Generate();
		let toggleOrthoContainerId = IdGenerator.Generate();

		let template = $(
		`<div>
			<div style="display: flex; flex-direction: row; margin-right: 10px;">
				<div>
					<div class="center-content" id="${planeViewContainerId}">
					</div>
					<div class="center-content" style="display: flex; flex-direction: row;">
						<div id="${firstRotationContainerId}">
						</div>
						<div id="${secondRotationContainerId}">
						</div>
					</div>
				</div>
				<div style="display: flex; flex-direction: column;">
					<div style="flex: 1;">
					</div>
					<div id="${inputContainerId}" class="center-content" style="flex: 1;">
					</div>
				</div>
			</div>
			<div id="${toggleOrthoContainerId}" class="center-content">
			</div>
		</div>`
		);

		let planeViewContainer = template.find("#"+planeViewContainerId);
		let firstRotationContainer = template.find("#"+firstRotationContainerId);
		let secondRotationContainer = template.find("#"+secondRotationContainerId);
		let inputContainer = template.find("#"+inputContainerId);
		let toggleOrthoContainer = template.find("#"+toggleOrthoContainerId);

		planeViewContainer.append(this.planeView.Element());
		firstRotationContainer.append(this.firstAngleView.Element());
		secondRotationContainer.append(this.secondAngleView.Element());
		inputContainer.append(this.inputGrid.Element());
		toggleOrthoContainer.append(this.toggleOrthoButton.Element());

		screen.ViewModeContent();
		screen.ContentContainer().append(template);

		this.planeView.RenderOnce();
		this.firstAngleView.RenderContinuously();
		this.secondAngleView.RenderContinuously();
	}
}