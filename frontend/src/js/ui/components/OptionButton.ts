import { Option } from "../Option";
import { OptionLog } from "../../metrics/ResultLog";

export class OptionButton extends Option
{
	private element : JQuery<HTMLElement>;

	constructor(id : number, name : string, expectedState : number)
	{
		super(id, name, expectedState);
		this.OnStateChanged = (button) => {};
		this.element = $(`<button type="button" class="btn btn-primary">${this.Name}</button>`);
		this.element.click(() =>
		{
			this.SetCurrentState(1);
		});
	}

	public Element() : JQuery<HTMLElement>
	{
		return this.element;
	}

	public Log() : OptionLog
	{
		return {
			Name : this.Name,
			SelectedState: this.GetCurrentState(),
			CorrectState: this.CorrectState
		};
	}
}