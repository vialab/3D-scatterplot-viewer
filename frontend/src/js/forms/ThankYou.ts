import { WebGLShadowMap } from "three";
import { TaskDisplay, UserInterface } from "../io";
import { ResultLog } from "../metrics/ResultLog";
import { Task } from "../tasks";
import { EmptyTaskcontroller } from "../tasks/EmptyTaskController";

export class ThankYou extends Task
{
	constructor()
	{
		super(new ThankYouDisplay(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(false);
	}

	public Submit(): void
	{
	}

	public LogResults(log: ResultLog): void
	{
	}
}

class ThankYouDisplay extends TaskDisplay
{
	public Display(screen: UserInterface): void
	{
		let template = $(
			`<div id="postSubmit">
				<p>
				Your study data has been received. Thank you for your participation.
				</p>
			</div>`
		);

		screen.ContentContainer().append(template);
		screen.ViewModeContent();
	}
}