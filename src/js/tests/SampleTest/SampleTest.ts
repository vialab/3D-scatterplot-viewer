import {Test, Option, TestResult} from "../../testing";
import {ImageDisplay} from "../../io";

export class SampleTest extends Test
{
	private display : ImageDisplay;
	private options : Option[];

	constructor()
	{
		super();
		this.options = [
			new Option(0, "Yes"),
			new Option(1, "No")
		];

		this.display = new ImageDisplay(
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
		);
	}

	Display(originalContainer: JQuery<HTMLElement>, comparisonContainer: JQuery<HTMLElement>): void
	{
		this.display.Display(originalContainer, comparisonContainer);
	}

	SubmitOptions(selectedOptions: import("../../testing/Option").Option[]): void
	{
		this.Complete(new TestResult());
	}

	GetTitle(): string
	{
		return "Sample Test 1: Select any option"
	}
	GetOptions(): import("../../testing/Option").Option[]
	{
		return this.options;
	}
	GetDuration(): number
	{
		return 0;
	}
}