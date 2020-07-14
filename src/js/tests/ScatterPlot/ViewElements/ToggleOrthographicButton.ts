import { ScatterPlotElement } from "./ScatterPlotElement";
import { IdGenerator } from "../../../util/IdGenerator";

export class ToggleOrthographicButton
{
	private button : JQuery<HTMLElement>;
	private isViewOrthographic = false;

	constructor(plot : ScatterPlotElement, isCurrentlyOrthographic : boolean)
	{
		this.isViewOrthographic = isCurrentlyOrthographic;

		let id = IdGenerator.Generate();
		this.button = $(`<button id="${id}">Toggle Orthographic/Perspective View</button>`);
		this.button.click(() =>
		{
			this.isViewOrthographic = !this.isViewOrthographic;

			if (this.isViewOrthographic)
				plot.UseOrthographicCamera();
			else
				plot.UsePerspectiveCamera();
		});
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.button;
	}
}