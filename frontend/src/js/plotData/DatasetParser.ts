import { Point } from "./Point";
import { Normalizer } from "./normalization/Normalizer";
import { Dataset } from "./Dataset";

export class DatasetParser
{
	public DatasetDimension = 3;

	public OffsetX = 0;
	public OffsetY = 1;
	public OffsetZ = 2;

	private normalizer : Normalizer;

	constructor(normalizer : Normalizer)
	{
		this.normalizer = normalizer;
	}

	public Parse(dataset : Dataset) : Point[]
	{
		let points : Point[] = [];
		let datasetEnd = dataset.Data.length-1;

		for (let rowStartIndex = 0; rowStartIndex < datasetEnd; rowStartIndex += dataset.Dimension)
		{
			let x = dataset.Data[rowStartIndex + this.OffsetX];
			let y = dataset.Data[rowStartIndex + this.OffsetY];
			let z = dataset.Data[rowStartIndex + this.OffsetZ];

			let point = new Point(x, y, z);
			points.push(point);
		}

		return this.normalizer.Normalize(points);
	}
}