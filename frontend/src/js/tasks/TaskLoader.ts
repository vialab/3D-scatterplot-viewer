import { Task } from ".";
import { SerializedTask } from "./SerializedTask";

export abstract class TaskLoader
{
	private serialization : SerializedTask | null = null;

	public abstract Create() : Promise<Task>;
	public abstract Serialize() : SerializedTask;
}