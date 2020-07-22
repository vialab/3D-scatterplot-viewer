import { PlotPoint } from "../tests/ScatterPlot/PlotPoint";

//Wine data and spec from:
//https://archive.ics.uci.edu/ml/datasets/Wine

export class CsvParser
{
	public POINT_MULTIPLY = 1;
	public EntriesPerLine = 3;

	private dataset : number[];
	private maxPoints : number;

	constructor(dataset : number[], entriesPerLine : number, maxPoints : number = 0)
	{
		this.dataset = dataset;
		this.EntriesPerLine = entriesPerLine;
		this.maxPoints = maxPoints;
	}

	public PasePoints(fitToAxisLength : number) : PlotPoint[]
	{
		let points : PlotPoint[] = [];
		let graphValueRange = fitToAxisLength / 2;

		let highestDatasetAxisValue = -99999999;

		let entriesPerRow = Math.floor(this.EntriesPerLine/3)*3;
		let limit = this.maxPoints == 0? this.dataset.length : this.maxPoints*3;

		for (let row = 0; row < limit; row+= this.EntriesPerLine)
		{
			for (let col = 0; col < entriesPerRow; col += 3)
			{
				let x = this.dataset[row + col] * this.POINT_MULTIPLY;
				let y = this.dataset[row + col + 1] * this.POINT_MULTIPLY;
				let z = this.dataset[row + col + 2] * this.POINT_MULTIPLY;

				let point = new PlotPoint(x, y, z);

				if (Math.abs(x) > highestDatasetAxisValue)
					highestDatasetAxisValue = x;
				if (Math.abs(y) > highestDatasetAxisValue)
					highestDatasetAxisValue = y;
				if (Math.abs(z) > highestDatasetAxisValue)
					highestDatasetAxisValue = z;
				
				points.push(point);
			}
		}

		//Fit the data points to the graph
		let aspectRatio = Math.abs(graphValueRange/highestDatasetAxisValue);
		for (let i = 0; i < points.length; i++)
		{
			let point = points[i];
			
			point.X = point.X * aspectRatio;
			point.Y = point.Y * aspectRatio;
			point.Z = point.Z * aspectRatio;
		}

		return points;
	}
}