export abstract class Timer
{
	protected startTime : number;

	constructor()
	{
		this.startTime = 0;
	}

	Begin() : void
	{
		this.startTime = Date.now();
	}

	ElapsedTime() : number
	{
		return Date.now() - this.startTime;
	}

	abstract Tick() : void;
	abstract Progress() : number;
}