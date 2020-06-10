import {Task, Option, ImageOption, TaskResult} from "../../tasks";
import {UserInterface, TaskDisplay} from "../../io";
import {Timer, UnlimitedTimer} from "../../metrics";

export class SampleCard extends Task
{
	private options : Option[];

	constructor()
	{
		super();

		this.options = [
			new CardOption(0, "images/cardOpt1.png"),
			new CardOption(1, "images/cardOpt2.png"),
			new CardOption(2, "images/cardOpt3.png"),
			new CardOption(3, "images/cardOpt4.png"),
		];

		this.SetCofidenceTracked(true);
	}

	OptionSelected(selectedOptions: Option): void
	{
	}

	GetOptions(): Option[]
	{
		return this.options;
	}

	GetDisplay(): TaskDisplay
	{
		return new CardDisplay("images/card.png");
	}
}

class CardOption extends ImageOption
{
	Template() : string
	{
		let template = `<div style="flex: 1; display: flex; justify-content: center; align-items: center; flex-direction: column;">
			<img src="${this.imageSrc}" style="width: 100px; height: 100px;"/>`

		let radio = `
		<div>
			<input type="radio" id="${this.SameRadioId()}" name="${this.Id}" value="${this.SameRadioId()}" />
			<label for="${this.SameRadioId()}">Same</label><br />

			<input type="radio" id="${this.DifferentRadioId()}" name="${this.Id}" value="${this.DifferentRadioId()}" />
			<label for="${this.DifferentRadioId()}">Different</label>
		</div>
		`;
		template += radio;
		// template += image;
		// // template += radio;
		template += `</div>`

		return template;
	}

	IsSameSelected()
	{
		return $(this.SameRadioId()).prop("checked");
	}

	IsDifferentSelected()
	{
		return $(this.SameRadioId()).prop("checked");
	}

	private SameRadioId() : string
	{
		return "OptionSame"+this.Id;
	}

	private DifferentRadioId() : string
	{
		return "OptionDiff"+this.Id;
	}
}

class CardDisplay extends TaskDisplay
{
	imageSrc = "";
	
	constructor(imageSrc : string)
	{
		super();
		this.imageSrc = imageSrc;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		screen.ContentContainer().html(`<img src="${this.imageSrc}" alt="failed to load image"/>`);
	}

}