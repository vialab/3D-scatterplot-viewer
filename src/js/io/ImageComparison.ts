import { TaskDisplay, UserInterface } from ".";

export class ImageComparison extends TaskDisplay
{
	private originalSrc : string;
	private compareSrc : string;

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

	private ImageHtml(src : string)
	{
		return `<img src="${src}" alt="Failed to load image" style="height: 100%; max-height: 500px;"/>`;
	}
}