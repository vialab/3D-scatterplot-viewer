import { Task, Option } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay, UserInterface } from "../../io";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { RotationImageSrc } from "./RotationImageSrc";
import { SerializedTask } from "../../tasks/SerializedTask";
import { TimedTestNotification } from "../../ui/components/TimedTestNotification";

export class RotationTutorial extends Task
{
	constructor()
	{
		super(new RotationTutorialDisplay(), new EmptyTaskcontroller());
		this.SetTitle("3D Rotation Instructions");
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public Submit()
	{
		this.Controller.Submit([]);
	}

	public LogResults(log: ResultLog): void
	{
	}
}

class RotationTutorialDisplay extends TaskDisplay
{

	constructor()
	{
		super();
	}

	public Display(screen: UserInterface): void
	{
		let page1 = RotationImageSrc.GetSrc(2);
		let page2 = RotationImageSrc.GetSrc(3);

		screen.ViewModeContent();

		screen.ContentContainer().append(this.imageTemplate(page1));
		screen.ContentContainer().append(this.imageTemplate(page2));

		screen.SubmitButton().html("Begin");
	}

	private imageTemplate(src : string)
	{
		return $(`<img src="${src}"
		alt="Failed to load image. Please reload this page"
		style="max-width: 800px; max-height: 800px;"
		/>`);
	}
}