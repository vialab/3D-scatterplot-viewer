import * as Three from "three";
import { TaskDisplay, UserInterface } from "../../io";
import { PlotPoint } from "./PlotPoint";
import { ScatterPlotElement } from "./ViewElements/ScatterPlotElement";
import { ToggleOrthographicButton } from "./ViewElements/ToggleOrthographicButton";
import { PlotInputElement } from "./ViewElements/PlotInputElement";
import { FixedRotationScatterPlotElement } from "./ViewElements/FixedRotationScatterPlotElement";
import { IdGenerator } from "../../util/IdGenerator";

export class MultiPlotView extends TaskDisplay
{
	private planeView : ScatterPlotElement;
	private firstAngleView : ScatterPlotElement;
	private secondAngleView : ScatterPlotElement;
	private inputGrid : PlotInputElement;

	private toggleOrthoButton : ToggleOrthographicButton;

	constructor(points : PlotPoint[], edgeLength : number)
	{
		super();

		//TODO only currently displays view down -z axis
		this.planeView = new ScatterPlotElement(points, edgeLength, 5);
		this.planeView.UseOrthographicCamera();

		let firstRotation = new Three.Vector2(Math.random() * 360, Math.random() * 180);
		this.firstAngleView = new FixedRotationScatterPlotElement(points, edgeLength, 5, firstRotation);
		this.firstAngleView.UsePerspectiveCamera();

		let secondRotation = new Three.Vector2(Math.random() * 360, Math.random() * 180);
		this.secondAngleView = new FixedRotationScatterPlotElement(points, edgeLength, 5, secondRotation);
		this.secondAngleView.UsePerspectiveCamera();

		this.toggleOrthoButton = new ToggleOrthographicButton([this.firstAngleView, this.secondAngleView], false);

		this.inputGrid = new PlotInputElement(this.firstAngleView.CameraNormal());
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