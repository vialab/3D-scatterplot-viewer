import {Option} from "../testing/Option";

export class UserInterface
{
	protected titleContainer : JQuery<HTMLElement>;
	protected timerBar : JQuery<HTMLElement>;
	protected optionsContainer : JQuery<HTMLElement>;
	protected originalView : JQuery<HTMLElement>
	protected comparisonView : JQuery<HTMLElement>;

	constructor()
	{
		this.titleContainer = $("#title");
		this.timerBar = $("#test-timer");
		this.optionsContainer = $("#options");
		this.originalView = $("#test-original");
		this.comparisonView = $("#test-compare");
	}

	SetTitle(title : string) : void
	{
		this.titleContainer.html(title);
	}

	SetTimerProgress(progress : number) : void
	{
		this.timerBar.css("width", progress + "%");
	}

	ShowOptions(options : Option[]) : void
	{
		let html = "";

		for (let i = 0; i < options.length; i++)
		{
			html += options[i].Template();
		}

		this.optionsContainer.html(html);
	}

	OriginalViewContainer() : JQuery<HTMLElement>
	{
		return this.originalView;
	}

	ComparisonViewContainer() : JQuery<HTMLElement>
	{
		return this.comparisonView;
	}
}