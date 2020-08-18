import { Point } from "../../PlotData/Point";
import { IndependentAxisNormalizer } from "../../PlotData/Normalization/IndependentAxisNormalizer";
import { TaskDisplay } from "../../io";
import { ContourPlaneDisplay } from "./ContourPlaneDisplay";
import { WaveGraphPoints } from "../../util/WaveGraphPoints";

export class WaveGraphDisplay extends ContourPlaneDisplay
{
	constructor(axisLength : number)
	{
		let points = WaveGraphPoints.GeneratePoints(40, 15);
		super(points, axisLength);
	}
}