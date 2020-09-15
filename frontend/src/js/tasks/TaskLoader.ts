import { Task } from ".";
import { SerializedTask } from "./SerializedTask";

export abstract class TaskLoader
{
	public abstract Create() : Promise<Task>;
	public abstract Serialize() : SerializedTask;
}