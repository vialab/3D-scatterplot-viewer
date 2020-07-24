import { Task, Option } from "../../tasks";

export class Isocontour extends Task
{
	constructor()
	{
		super();
		this.SetPrompt("Does the isocontour represent the graph?");
	}

	public Submit(selectedOptions: Option | Option[]): void
	{
		this.Complete();
	}

	public GetOptions(): Option[]
	{
		return [
			new Option(0, "Yes"),
			new Option(1, "No"),
		];
	}
	
}