import {GlobalDisplay} from "./GlobalDisplay";

export abstract class TestDisplay
{
	abstract Display(screen : GlobalDisplay) : void;
}