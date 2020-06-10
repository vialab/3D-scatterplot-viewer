import { Task, Option, TaskResult } from "../tasks";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";

export class Consent extends Task
{
	display : ConsentForm = new ConsentForm(this);

	constructor()
	{
		super();
		this.SetTitle("Consent Form");
	}

	OptionSelected(selectedOptions: Option): void
	{
		this.Complete();
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
}

class ConsentForm extends TaskDisplay
{
	private task : Task;
	private template : string;

	constructor(task : Task)
	{
		super();

		this.task = task;

		this.template =
		`<div style="width: 60%">
			<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
			<hr />
			<p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
			<hr />
			<div>
				<input id="chk-consent" type="checkbox" class="form-check-input" />
				<label class="form-check-label" for="exampleCheck1">I consent to the terms above and agree to do the test</label>
				<div><button id="btn-consent" class="btn btn-primary" disabled>Next</button></div>
			</div>
		</div>`;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(this.template);
		
		$("#chk-consent").click((evt)=>
		{
			let isChecked : boolean = $(evt.target).prop("checked");
			$("#btn-consent").prop("disabled", !isChecked);
		});

		$("#btn-consent").click(() =>
		{
			this.task.Complete();
		});
	}

}