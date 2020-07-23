import { Color } from "../../io/ui/Color";

export class PieChartData
{
	public Label : string;
	public Value : number;
	public Colour : Color;

	constructor(label : string, value : number, colour : Color)
	{
		this.Label = label;
		this.Value = value;
		this.Colour = colour;
	}
}