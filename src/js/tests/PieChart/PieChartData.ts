import { Colour } from "../../io/Colour";

export class PieChartData
{
	public Label : string;
	public Value : number;
	public Colour : Colour;

	constructor(label : string, value : number, colour : Colour)
	{
		this.Label = label;
		this.Value = value;
		this.Colour = colour;
	}
}