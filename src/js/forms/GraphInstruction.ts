import { Task, Option, TaskResult } from "../tasks";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";

export class GraphInstruction extends Task
{
	private display : TaskDisplay;

	constructor()
	{
		super();
		this.display = new GraphInstructionPage(this);
	}

	OptionSelected(selectedOptions: Option): void
	{
		throw new Error("Method not implemented.");
	}

	GetTitle(): string
	{
		return "Instructions"
	}
	GetPrompt(): string
	{
		return "";
	}
	GetOptions(): Option[]
	{
		return [];
	}
	GetDisplay(): TaskDisplay
	{
		return this.display;
	}
	GetTimer(): Timer
	{
		return new UnlimitedTimer();
	}

	IsConfidenceTracked(): boolean
	{
		return false;
	}
	IsResultsTracked(): boolean
	{
		return false;
	}
}

class GraphInstructionPage extends TaskDisplay
{
	private template : string;
	private task : Task;

	constructor(task : Task)
	{
		super();
		this.task = task;
		this.template =
		`<div style="width: 80%">
			<div style="display: flex">
				<div style="flex:6"><img src="images/sample_graph_1.png" /></div>
				<div style="display: flex;flex: 2; justify-content: center;align-items: center;">
					<span style="font-size: 20pt;">&gt;</span>
				</div>
				<div style="flex:6"><img src="images/sample_graph_2.png" /></div>
			</div>
			<hr />
			Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
			<hr />
			<button id="next" class="btn btn-primary">Begin</button>
		</div>`;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);

		$("#next").click(() =>
		{
			this.task.Complete();
		});
	}
	
}