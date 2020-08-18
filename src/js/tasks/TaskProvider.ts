import { Task } from ".";

export interface TaskProvider
{
	Tutorial() : Task;
	Create() : Task;
}