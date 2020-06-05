import {Option, Task} from "../tasks";

export class UserInterface
{
	protected titleContainer : JQuery<HTMLElement>;
	protected promptContainer : JQuery<HTMLElement>;
	protected timerBar : JQuery<HTMLElement>;
	protected optionsContainer : JQuery<HTMLElement>;
	
	protected contentContainer : JQuery<HTMLElement>;

	protected comparisonContainer : JQuery<HTMLElement>;
	protected originalView : JQuery<HTMLElement>
	protected comparisonView : JQuery<HTMLElement>;

	protected completionContainer : JQuery<HTMLElement>;

	constructor()
	{
		this.titleContainer = $("#title");
		this.promptContainer = $("#prompt");
		this.timerBar = $("#test-timer");
		this.optionsContainer = $("#options");

		this.contentContainer = $("#content-single");

		this.comparisonContainer = $("#comparison-area");;
		this.originalView = $("#test-original");
		this.comparisonView = $("#test-compare");

		this.completionContainer = $("#completion-window");
	}

	SetTitle(title : string) : void
	{
		this.titleContainer.html(title);
	}

	SetOptionsPrompt(prompt : string) : void
	{
		this.promptContainer.html(prompt);
	}

	SetTimerProgress(progress : number) : void
	{
		this.timerBar.css("width", progress + "%");
	}

	ShowOptions(task : Task) : void
	{
		this.optionsContainer.html("");

		let options = task.GetOptions();

		for (let i = 0; i < options.length; i++)
		{
			let option = options[i];
			let template = options[i].Template();
			let element = $(template);

			element.prop("data-option-id", option.Id);
			element.click(() =>
			{
				task.OptionSelected(option);
			});

			this.optionsContainer.append(element);
		}
	}

	ContentContainer() : JQuery<HTMLElement>
	{
		return this.contentContainer;
	}

	OriginalViewContainer() : JQuery<HTMLElement>
	{
		return this.originalView;
	}

	ComparisonViewContainer() : JQuery<HTMLElement>
	{
		return this.comparisonView;
	}

	ViewModeComparison()
	{
		this.contentContainer.hide();
		this.completionContainer.hide();

		this.comparisonContainer.show();
	}

	ViewModeContent()
	{
		this.comparisonContainer.hide();
		this.completionContainer.hide();

		this.contentContainer.show();
	}

	ViewModeTestsComplete()
	{
		this.comparisonContainer.hide();
		this.contentContainer.hide();
		
		this.completionContainer.show();
	}
}