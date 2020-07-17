import * as Three from "three";
import { Vector3, Matrix4, Matrix3 } from "three";

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
};