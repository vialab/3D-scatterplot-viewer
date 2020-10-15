import { UiElement } from "../UiElement";

export class TimedTestNotification implements UiElement
{
	Element(): JQuery<HTMLElement>
	{
		return $(
			`<div style="text-align: center">
				<p>This test is timed. The timer bar is shown at the top of the screen as follows:</p>
				<img src="images/timerinst.png" alt="Failed to load image" />
			</div>`
		);
	}
}