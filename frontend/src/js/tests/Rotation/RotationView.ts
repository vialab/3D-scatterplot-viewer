import { TaskDisplay, UserInterface } from "../../io";
import { RotationImageSrc } from "./RotationImageSrc";
import { IdGenerator } from "../../util/IdGenerator";

export class RotationView extends TaskDisplay
{
	private imageSrc : string;

	constructor(screenNumber : number)
	{
		super();
		this.imageSrc = RotationImageSrc.GetSrc(screenNumber);
	}

	public Display(screen: UserInterface): void
	{
		let image = $(`<img src="${this.imageSrc}"
			alt="Failed to load image, please refresh this page"
			style="max-width: 800px; max-height: 800px;"
			/>
		`);

		let template = $(`
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

		template.find("#imgContainer").append(image);

		screen.ViewModeContent();
		screen.ContentContainer().append(template);
	}
}