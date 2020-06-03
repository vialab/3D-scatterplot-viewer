import {Timer} from "./Timer";

export class UnlimitedTimer extends Timer
{
	constructor()
	{
		super();
	}

	Tick() : void
	{
	}

	Progress(): number
	{
		return 0;
	}
}