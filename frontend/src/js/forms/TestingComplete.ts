import { Task, Option } from "../tasks";
import { UserInterface, TaskDisplay } from "../io";
import { Timer, UnlimitedTimer } from "../metrics";
import { TaskController } from "../tasks/TaskController";
import { ResultLog } from "../metrics/ResultLog";
import { Backend } from "../Backend";
import { SerializedTask } from "../tasks/SerializedTask";

export class TestingComplete extends Task
{
	constructor(backend : Backend, log : ResultLog)
	{
		let controller = new TestingCompleteController(backend, log);
		let display = new TestingCompleteDisplay(controller);
		super(display, controller);
	}

	public Submit()
	{
		this.Controller.Submit([]);
	}
	
	public LogResults(log : ResultLog) : void
	{
	}

	public Serialize() : SerializedTask
	{
		return {
			Name: TestingComplete.name,
			DatasetName: "",
			Metadata: {}
		};
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

	Submit(selectedOptions: Option): void
	{
		// this.Complete();
		this.SubmitSession();
	}

	async SubmitSession()
	{
		try
		{
			await this.backend.SubmitSession(this.log);
		}
		catch (err)
		{
			alert("An error occurred submitting the session");
			console.log(err);
		}
	}
}

class TestingCompleteDisplay extends TaskDisplay
{
	private controller : TaskController;

	constructor(controller : TaskController)
	{
		super();
		this.controller = controller;
	}

	Display(screen: UserInterface): void
	{
		$("#submit-session").click(() =>
		{
			this.controller.Submit([]);
		});

		screen.ViewModeTestsComplete();
	}
}