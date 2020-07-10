import { UserInterface, TaskDisplay } from "..";

export class ImageComparisonInstructionDisplay extends TaskDisplay
{
	public isTimed : boolean;
	public prompt : string;

	protected originalSrc : string;
	protected compareSrc : string;

	constructor(originalSrc : string, compareSrc : string)
	{
		super();

		this.originalSrc = originalSrc;
		this.compareSrc = compareSrc;

		this.isTimed = true;
		this.prompt = "";
	}

	Display(screen : UserInterface): void
	{
		let template : string = `<div style="width: 90%;">`;

		template += `<div style="display: flex;">`
		template += this.ImageHtml(this.originalSrc);
		template += this.ImageHtml(this.compareSrc);
		template += `</div>`;

		if (this.prompt != "")
		{
			template += `<hr /><p style="text-align: center;">${this.prompt}</p>`;
		}

		if (this.isTimed)
		{
			template += `<hr /><div style="text-align: center;">`
			template += `<p>This test has a time limit. Your remaining time is indicated at the bottom of the screen as follows. The practice test has no time limit.</p>`
			template += `<img src="images/timerinst.png" />`
			template += `</div>`
		}

		template += `</div>`;

		screen.ViewModeContent();

		screen.ContentContainer().html(template);
	}

	protected ImageHtml(src : string) : string
	{
		return `<img class="fit" src="${src}" alt="Failed to load image" style="flex: 1; height: 100%; max-height: 500px; min-width: 0px; min-height: 0px;"/>`;
	}
}