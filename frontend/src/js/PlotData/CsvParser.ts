import { Point } from "./Point";
import { Normalizer } from "./Normalization/Normalizer";

export class CsvParser
{
	public POINT_MULTIPLY = 1;
	public EntriesPerLine = 3;

	private normalizer : Normalizer;
	private dataset : number[];
	private maxPoints : number;

	constructor(normalizer : Normalizer, dataset : number[], entriesPerLine : number=3, maxPoints : number = 0)
	{
		this.normalizer = normalizer;
		this.dataset = dataset;
		this.EntriesPerLine = entriesPerLine;
		this.maxPoints = maxPoints;
	}

	public ParsePoints() : Point[]
	{
		let points : Point[] = [];

		let entriesPerRow = Math.floor(this.EntriesPerLine/3)*3; //Break each row of data into groups of 3s
		let limit = this.maxPoints == 0? this.dataset.length : this.maxPoints*3;

		for (let row = 0; row < limit; row+= this.EntriesPerLine) //Loop each line in the csv
		{
			for (let col = 0; col < entriesPerRow; col += 3) //Loop each group of 3 in each line
			{
				let x = this.dataset[row + col] * this.POINT_MULTIPLY;
				let y = this.dataset[row + col + 1] * this.POINT_MULTIPLY;
				let z = this.dataset[row + col + 2] * this.POINT_MULTIPLY;

				let point = new Point(x, y, z);
				points.push(point);
			}
		}

		return this.normalizer.Normalize(points);
	}
}