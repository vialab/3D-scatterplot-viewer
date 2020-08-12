import { Task, Option } from "../../tasks";
import { TaskController } from "../../tasks/TaskController";

export class Isocontour extends TaskController
{
	constructor()
	{
		super();
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