import { UiElement } from "../../../ui/UiElement";
import { FormElement } from "../../../ui/FormElement";

export class Age implements FormElement
{
	element : JQuery<HTMLElement>;

	constructor()
	{
		this.element = $(
		`<div>
			<p>What is your age?</p>
			<input type="text" name="age" />
		</div>`
		);
	}

	public Value() : any
	{
		return $("input[name=age]").val();
	}

	public Element(): JQuery<HTMLElement>
	{
		return this.element;
	}
}