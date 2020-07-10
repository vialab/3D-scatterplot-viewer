import { TaskDisplay, UserInterface } from "..";

export class ImageComparisonDisplay extends TaskDisplay
{
	protected originalSrc : string;
	protected compareSrc : string;

	constructor(originalSrc : string, compareSrc : string)
	{
		super();

		this.originalSrc = originalSrc;
		this.compareSrc = compareSrc;
	}

	Display(screen : UserInterface): void
	{
		screen.ViewModeComparison();

		screen.OriginalViewContainer()
			.html(this.ImageHtml(this.originalSrc));
		
		screen.ComparisonViewContainer()
			.html(this.ImageHtml(this.compareSrc));
	}

	protected ImageHtml(src : string) : string
	{
		return `<img src="${src}" alt="Failed to load image" style="height: 100%; max-height: 500px;"/>`;
	}
}