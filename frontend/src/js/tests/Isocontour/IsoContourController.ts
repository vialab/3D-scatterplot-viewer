import { Task, Option } from "../../tasks";
import { TaskController } from "../../tasks/TaskController";

export class IsocontourController extends TaskController
{
	constructor()
	{
		super();
	}

	public Submit(selectedOptions: Option | Option[]): void
	{
		this.Complete();
	}
}