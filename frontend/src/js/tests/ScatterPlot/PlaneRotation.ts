import { Vector2, Vector3 } from "three";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";

export class PlaneRotation
{
	public static RotationFor(normal : Vector3) : Vector2
	{
		if (normal == GraphPlaneNormals.UP)
			return new Vector2(90, 0);
		else if (normal == GraphPlaneNormals.DOWN)
			return new Vector2(-90, 0);
		else if (normal == GraphPlaneNormals.LEFT)
			return new Vector2(0, 90);
		else if (normal == GraphPlaneNormals.RIGHT)
			return new Vector2(0, -90);
		else if (normal == GraphPlaneNormals.AWAY)
			return new Vector2(0, 180);
		else if (normal == GraphPlaneNormals.TOWARDS)
			return new Vector2(0, 0);
		
		throw new Error("normal must be a constant contained in PlotNormals.ALL");
	}
}