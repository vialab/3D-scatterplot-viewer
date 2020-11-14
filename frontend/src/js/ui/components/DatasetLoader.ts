import { Backend } from "../../Backend";
import { DatasetParser } from "../../plotData/DatasetParser";
import { FitToBoundsNormalizer } from "../../plotData/normalization/FitToBoundsNormalizer";
import { Normalizer } from "../../plotData/normalization/Normalizer";
import { Point } from "../../plotData/Point";
import { UiElement } from "../UiElement";

export class DatasetLoader implements UiElement
{
	private backend : Backend;
	private template : JQuery<HTMLElement>;
	private datasetNameInput : JQuery<HTMLElement>;
	private xOffInput : JQuery<HTMLElement>;
	private yOffInput : JQuery<HTMLElement>;
	private zOffInput : JQuery<HTMLElement>;
	private normalizerInput : JQuery<HTMLElement>;
	private loadButton : JQuery<HTMLElement>;

	public OnLoad : (points : Point[]) => void = () => {};

	constructor(backend : Backend)
	{
		this.backend = backend;

		let template = $(`<div style="background-color: #e9ecef;padding: 15px;text-align: center;"></div>`);

		this.datasetNameInput = $(`<input type="text" value="iris.csv"/>`);
		this.xOffInput = $(`<input type="text" value="0"/>`);
		this.yOffInput = $(`<input type="text" value="1"/>`);
		this.zOffInput = $(`<input type="text" value="2"/>`);
		this.normalizerInput = $(`
		<select>
			<option value="0"></option>
			<option value="1"></option>
			<option value="2"></option>
		</select>
		`);

		this.loadButton = $(`<button class="submit">Load</button>`);
		this.loadButton.click(() =>
		{
			this.Load();
		});

		template.append("<hr />");

		template.append("Dataset Name: ");
		template.append(this.datasetNameInput);

		template.append("<hr />");

		template.append("Data Point Offsets<br />");
		template.append("x: ");
		template.append(this.xOffInput);

		template.append(" y: ");
		template.append(this.yOffInput);

		template.append(" z: ");
		template.append(this.zOffInput);

		template.append("<hr />");

		template.append(this.loadButton);

		this.template = template;
	}

	private GetXOffset() : number
	{
		return this.tryParseOffset(this.xOffInput);
	}

	private GetYOffset() : number
	{
		return this.tryParseOffset(this.yOffInput);
	}

	private GetZOffset() : number
	{
		return this.tryParseOffset(this.zOffInput);
	}

	private GetNormalizer() : Normalizer
	{
		let normalizerValue = this.normalizerInput.val();
		return new FitToBoundsNormalizer();
	}

	private tryParseOffset(elem : JQuery<HTMLElement>) : number
	{
		let value = Number.parseFloat(<string>elem.val());

		if (Number.isNaN(value))
		{
			let msg = "Non numeric input in offset field";
			alert(msg);
			throw new Error(msg);
		}

		return value;
	}

	public async Load()
	{
		let xOff = this.GetXOffset();
		let yOff = this.GetYOffset();
		let zOff = this.GetZOffset();

		let normalizer = this.GetNormalizer();

		let parser = new DatasetParser(normalizer);
		parser.OffsetX = xOff;
		parser.OffsetY = yOff;
		parser.OffsetZ = zOff;

		let dataset = await this.backend.GetDataset(<string>this.datasetNameInput.val()?.toString().trim());

		let points = parser.Parse(dataset);

		this.OnLoad(points);
	}

	Element(): JQuery<HTMLElement>
	{
		return this.template;
	}
}