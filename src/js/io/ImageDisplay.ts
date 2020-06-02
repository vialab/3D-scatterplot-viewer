import { TestDisplay, GlobalDisplay } from ".";

export class ImageDisplay extends TestDisplay
{
	private originalSrc : string;
	private compareSrc : string;

	constructor(originalSrc : string, compareSrc : string)
	{
		super();

		this.originalSrc = originalSrc;
		this.compareSrc = compareSrc;
	}

	Display(screen : GlobalDisplay): void
	{
		screen
			.OriginalViewContainer()
			.html(`<img src="${this.originalSrc}" alt="Failed to load image" />`);
		
		screen
			.ComparisonViewContainer()
			.html(`<img src="${this.compareSrc}" alt="Failed to load image" />`);
	}
}