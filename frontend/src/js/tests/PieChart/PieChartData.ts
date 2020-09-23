import { Color } from "../../ui/Color";

export class PieChartData
{
	public Label : string;
	public Value : number;
	public Color : Color;

	constructor(label : string, value : number, color : Color)
	{
		this.Label = label;
		this.Value = value;
		this.Color = color;
	}
}