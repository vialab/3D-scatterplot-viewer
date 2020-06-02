import { TestDisplay } from ".";

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

	Display(originalContainer: JQuery<HTMLElement>, comparisonContainer: JQuery<HTMLElement>): void
	{
		originalContainer.html(`<img src="${this.originalSrc}" alt="Failed to load image" />`);
		comparisonContainer.html(`<img src="${this.compareSrc}" alt="Failed to load image" />`);
	}
}