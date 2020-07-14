import * as Three from "three";
import { Vector3 } from "three";

export default class PlotNormals
{
	static TOWARDS = new Three.Vector3(0,0,1);
	static AWAY = new Three.Vector3(0,0,-1);

	static UP = new Three.Vector3(0,1,0);
	static DOWN = new Three.Vector3(0,-1,0);

	static RIGHT = new Three.Vector3(1,0,0);
	static LEFT = new Three.Vector3(-1,0,0);

	static ALL = [
		PlotNormals.TOWARDS,
		PlotNormals.AWAY,
		PlotNormals.UP,
		PlotNormals.DOWN,
		PlotNormals.RIGHT,
		PlotNormals.LEFT
	];

	static UpFrom(direction : Three.Vector3) : Three.Vector3
	{
		return PlotNormals.Cross(direction, PlotNormals.LEFT);
	}

	static DownFrom(direction : Three.Vector3) : Three.Vector3
	{
		return PlotNormals.Cross(direction, PlotNormals.RIGHT);
	}

	static CloserFrom(direction : Three.Vector3) : Three.Vector3
	{
		let further = PlotNormals.Normal(direction);
		return new Three.Vector3(further.x, further.y, -further.z);
	}

	static FurtherFrom(direction : Three.Vector3) : Three.Vector3
	{
		return PlotNormals.Normal(direction);
	}

	static RightFrom(direction : Three.Vector3) : Three.Vector3
	{
		return PlotNormals.Cross(direction, PlotNormals.UP);
	}

	static LeftFrom(direction : Three.Vector3) : Three.Vector3
	{
		return PlotNormals.Cross(direction, PlotNormals.DOWN);
	}

	private static Cross(first : Three.Vector3, second : Three.Vector3)
	{
		return PlotNormals.Normal(first).cross(PlotNormals.Normal(second));
	}

	private static Normal(of : Three.Vector3)
	{
		return new Vector3(of.x, of.y, of.z).normalize();
	}
};