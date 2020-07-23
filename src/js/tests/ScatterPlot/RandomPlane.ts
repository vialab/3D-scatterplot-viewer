import { Vector3, Vector2 } from "three";
import GraphPlaneNormals from "../../io/ui/components/PlaneNormals";

export class RandomPlane
{
	public static Select() : PlaneSelection
	{
		let planeIndex = Math.round((GraphPlaneNormals.ALL.length-1) * Math.random());
		let plane = GraphPlaneNormals.ALL[planeIndex];
		let rotation = RandomPlane.rotationFor(plane);

		return {
			Normal : plane,
			Rotation : rotation
		};
	}

	public static rotationFor(normal : Vector3) : Vector2
	{
		if (normal == GraphPlaneNormals.UP)
			return new Vector2(0,0);
		else if (normal == GraphPlaneNormals.DOWN)
			return new Vector2(0, 180);
		else if (normal == GraphPlaneNormals.LEFT)
			return new Vector2(-90, 90);
		else if (normal == GraphPlaneNormals.RIGHT)
			return new Vector2(90, 90);
		else if (normal == GraphPlaneNormals.AWAY)
			return new Vector2(180, 90);
		else if (normal == GraphPlaneNormals.TOWARDS)
			return new Vector2(0, 90);
		
		throw new Error("normal must be a constant contained in PlotNormals.ALL");
	}

}

interface PlaneSelection
{
	Normal : Vector3,
	Rotation : Vector2
}