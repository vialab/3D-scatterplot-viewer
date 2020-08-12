import { Task } from ".";

export interface TaskProvider
{
	Create() : Task;
}