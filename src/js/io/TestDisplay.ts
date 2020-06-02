import {UserInterface} from "./GlobalDisplay";

export abstract class TestDisplay
{
	abstract Display(screen : UserInterface) : void;
}