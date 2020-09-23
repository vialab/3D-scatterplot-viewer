import { Task } from "../../tasks";
import { ResultLog } from "../../metrics/ResultLog";
import { TaskDisplay, UserInterface } from "../../io";
import { EmptyTaskcontroller } from "../../tasks/EmptyTaskController";
import { RotationImageSrc } from "./RotationImageSrc";
import { SerializedTask } from "../../tasks/SerializedTask";

export class RotationTutorial extends Task
{
	constructor()
	{
		super(new RotationTutorialDisplay(), new EmptyTaskcontroller());
		this.SetExplicitSubmissionRequired(true);
		this.SetCofidenceTracked(false);
	}

	public LogResults(log: ResultLog): void
	{
	}

	public Serialize() : SerializedTask
	{
		return {
			Name : RotationTutorial.name,
			DatasetName: "",
			Metadata : {}
		};
	}
}

const MIN_TUTORIAL_PAGE = 2;
const MAX_TUTORIAL_PAGE : number = 3;

class RotationTutorialDisplay extends TaskDisplay
{
	currentPage : number;
	template : JQuery<HTMLElement>;

	constructor()
	{
		super();
		this.currentPage = MIN_TUTORIAL_PAGE;

		this.template = $(`
		<div>
			<div id="instruction"></div>
			<div style="display: flex; text-align: center; padding-top: 15px;">
				<div style="flex: 1;"><button id="prev" class="submit">Previous Page</button></div>
				<div id="page" style=" flex: 1;"></div>
				<div style="flex: 1;"><button id="next" class="submit">Next Page</button></div>
			</div>
		</div>
		`);

		this.template.find("#prev").click(() =>
		{
			if (this.currentPage > MIN_TUTORIAL_PAGE)
			{
				this.currentPage--;
				this.updatePageText();
				this.updateImage();
			}
		});

		this.template.find("#next").click(() =>
		{
			if (this.currentPage < MAX_TUTORIAL_PAGE)
			{
				this.currentPage++;
				this.updatePageText();
				this.updateImage();
			}
		});

		this.updatePageText();
		this.updateImage();
	}

	private updatePageText()
	{
		let currentIndex = this.currentPage - MIN_TUTORIAL_PAGE + 1;
		let maxIndex = MAX_TUTORIAL_PAGE - MIN_TUTORIAL_PAGE + 1;

		this.template
			.find("#page")
			.html(`Page ${currentIndex} of ${maxIndex}`);
	}

	private updateImage()
	{
		let src = RotationImageSrc.GetSrc(this.currentPage);
		this.template.find("#instruction")
			.html(`<img src="${src}"
			alt="Failed to load image. Please reload this page"
			style="max-width: 800px; max-height: 800px;"
			/>`);
	}

	public Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().append(this.template);
	}
}