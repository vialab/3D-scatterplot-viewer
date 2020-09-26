import { SerializedTask } from "./tasks/SerializedTask";

export interface TestOrder
{
	Name : string;
	Tests : SerializedTask[];
}