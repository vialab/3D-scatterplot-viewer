import { ContourPlotComparison } from "./ContourPlotComparison";
import { WaveGraphPoints } from "../../../util/WaveGraphPoints";

export class WaveGraphContourComparison extends ContourPlotComparison
{
	constructor(axisLength : number)
	{
		let points = WaveGraphPoints.GeneratePoints(40, 15);
		super(points, axisLength);
	}
}