import { Task, Option } from "../tasks";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";
import { TaskController } from "../tasks/TaskController";
import { CompensationLog, ResultLog } from "../metrics/ResultLog";
import { Backend } from "../Backend";
import { SerializedTask } from "../tasks/SerializedTask";

export class TestingComplete extends Task
{
	constructor(backend : Backend, log : ResultLog)
	{
		let controller = new TestingCompleteController(backend, log);
		let display = new TestingCompleteDisplay(controller);

		super(display, controller);
		this.SetExplicitSubmissionRequired(false);
	}

	public async Submit()
	{
	}
	
	public LogResults(log : ResultLog) : void
	{
		log.Compensation = (<TestingCompleteDisplay>this.Display).GetCompensationLog();
	}

	public async Finish()
	{
		await this.sendResults();
	}

	private async sendResults()
	{
		try
		{
			await (<TestingCompleteController>this.Controller).SubmitSession();
		}
		catch (err)
		{
			alert(err.message);
		}
	}
}

class TestingCompleteController extends TaskController
{
	backend : Backend;
	log : ResultLog;

	constructor(backend : Backend, log : ResultLog)
	{
		super();
		this.backend = backend;
		this.log = log;
	}

	Submit(selectedOptions: Option | Option[]): void
	{
	}

	public async SubmitSession()
	{
		let isDataStored : boolean = true;

		try
		{
			console.log("Submitting");
			console.log(this.log);

			await this.backend.SubmitSession(this.log);
		}
		catch (err)
		{
			isDataStored = err.status != 504 && err.status != 404;
			console.log(err);
		}

		if (!isDataStored)
		{
			throw new Error("An error occurred submitting the session");
		}
		else
		{
			this.Complete();
		}
	}
}

class TestingCompleteDisplay extends TaskDisplay
{
	private controller : TestingCompleteController;
	private form : JQuery<HTMLElement>
	private nameInput  : JQuery<HTMLElement>;
	private emailInput : JQuery<HTMLElement>;
	private confirmEmailinput : JQuery<HTMLElement>;
	private countryInput : JQuery<HTMLElement>;
	private errorDisplay : JQuery<HTMLElement>;

	private isSubmissionComplete = false;

	constructor(controller : TestingCompleteController)
	{
		super();
		this.controller = controller;
		this.form = $(`
		<div id="completion-window" class="flex-container center-content">
			<div style="width: 80%; text-align: center;">
				<h1>Results Submission</h1>
				<hr />
				<p>
					Press the submit button below to submit your information.
				</p>
				<div>
					<p>
						To receive a $20 CAD Amazon gift card for your participation, fill out the form below.
					</p>
					<div class="center-content">
						<table class="w3-table" style="width: auto;">
							<tr>
								<td>Name: </td>
								<td><input id="name" type="text" name="name"/></td>
							</tr>
							<tr>
								<td>Email Address: </td>
								<td><input id="email" type="text" name="email"/></td>
							</tr>
							<tr>
								<td>Confirm Email: </td>
								<td><input id="email-confirm" type="text" name="email-confirm"/></td>
							</tr>
							<tr>
								<td>Country: </td>
								<td><input id="country" type="text" name="country"/></td>
							</tr>
						</table>
					</div>
				</div>
				<hr />
				<div id="validation-errors" style="color: red;"></div>
				<div>
					<p>
						Remember that due to the anonymous nature of the data, your results cannot be withdrawn once submitted.
					</p>
					<div class="center-content">
						<div style="width: 15%;">
							<button id="submit-session" class="submit">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>`
		);

		this.nameInput = this.form.find("#name");
		this.emailInput = this.form.find("#email");
		this.confirmEmailinput = this.form.find("#email-confirm");
		this.countryInput = this.form.find("#country");

		this.errorDisplay = this.form.find("#validation-errors");

		let submitButton = this.form.find("#submit-session");

		submitButton.click(async () =>
		{
			submitButton.prop("enabled", false);

			let errorMessage = "";

			if (this.nameInput.val()?.toString().trim() == "")
			{
				errorMessage = "Missing value: Name";
			}
			else if (this.emailInput.val()?.toString().trim() == "")
			{
				errorMessage = "Missing value: Email"
			}
			else if (this.emailInput.val() != this.confirmEmailinput.val())
			{
				errorMessage = "Email and confirm email do not match";
			}
			else if (this.countryInput.val()?.toString().trim() == "")
			{
				errorMessage = "Missing value: Country"
			}

			if (errorMessage == "")
			{
				controller.Complete();
			}
			else
			{
				submitButton.prop("enabled", true);
			}

			this.errorDisplay.html(errorMessage);
		});
	}

	public IsSubmissionComplete() : boolean
	{
		return this.isSubmissionComplete;
	}

	public GetCompensationLog() : CompensationLog
	{
		return {
			Name: "" + this.nameInput.val(),
			Email: "" + this.emailInput.val(),
			Country: "" + this.countryInput.val()
		};
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().append(this.form)
	}
}