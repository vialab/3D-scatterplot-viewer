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
			.html(`<img src="${this.originalSrc}" alt="Failed to load image" />`);
		
		screen.ComparisonViewContainer()
			.html(`<img src="${this.compareSrc}" alt="Failed to load image" />`);
	}
}