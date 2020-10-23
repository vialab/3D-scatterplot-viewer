import { Vector3, Vector2 } from "three";
import GraphPlaneNormals from "../../ui/components/PlaneNormals";
import { PlaneRotation } from "./PlaneRotation";

export class RandomPlane
{
	public static Select() : PlaneSelection
	{
		let planeIndex = Math.round((GraphPlaneNormals.ALL.length-1) * Math.random());
		let plane = GraphPlaneNormals.ALL[planeIndex];
		let rotation = PlaneRotation.RotationFor(plane);

		return {
			Normal : plane,
			Rotation : rotation
		};
	}
}

interface PlaneSelection
{
	Normal : Vector3,
	Rotation : Vector2
}