import { TaskDisplay, UserInterface } from "../../io";
import { RotationImageSrc } from "./RotationImageSrc";
import { IdGenerator } from "../../util/IdGenerator";
import { Option } from "../../tasks";
import { NonDisplayOption } from "../../ui/Option";

const NUM_OPTIONS = 5;

export class RotationView extends TaskDisplay
{
	private imageSrc : string;
	private template : JQuery<HTMLElement>;

	private options : Option[];

	constructor(screenNumber : number)
	{
		super();
		this.imageSrc = RotationImageSrc.GetSrc(screenNumber);
		
		this.template = $(`
		<table>
			<tr><td id="imgContainer" colspan="5"></td></tr>
			<tr style="text-align: center">
				<td>
					<input type="radio" name="rotation" value="0"/>
				</td>
				<td>
					<input type="radio" name="rotation" value="1"/>
				</td>
				<td>
					<input type="radio" name="rotation" value="2"/>
				</td>
				<td>
					<input type="radio" name="rotation" value="3"/>
				</td>
				<td>
					<input type="radio" name="rotation" value="4"/>
				</td>
			</tr>
		</table>
		`);

		this.options = [];
		for (let i = 0; i < NUM_OPTIONS; i++)
		{
			this.options.push(new NonDisplayOption(i, ""+i, 0));
		}
	}

	public Display(screen: UserInterface): void
	{
		let image = $(`<img src="${this.imageSrc}"
			alt="Failed to load image, please refresh this page"
			style="max-width: 800px; max-height: 800px;"
			/>
		`);

		this.template.find("#imgContainer").append(image);

		screen.ViewModeContent();
		screen.ContentContainer().append(this.template);
	}

	public GetOptions() : Option[]
	{
		let selectedId = this.template.find("input[name='rotation']:checked").val();

		for (let i = 0; i < this.options.length; i++)
		{
			this.options[i].SetCurrentState(this.options[i].Id == selectedId? 1 : 0);
		}

		return this.options;
	}
}