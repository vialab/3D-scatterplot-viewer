import {UserInterface} from "./UserInterface";

export abstract class TestDisplay
{
	abstract Display(screen : UserInterface) : void;
}