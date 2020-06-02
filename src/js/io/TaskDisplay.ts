import {UserInterface} from "./UserInterface";

export abstract class TaskDisplay
{
	abstract Display(screen : UserInterface) : void;
}