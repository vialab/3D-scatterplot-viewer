import {Test, Option, TestResult} from "../../testing";
import {ImageDisplay, TestDisplay} from "../../io";

export class SampleTest extends Test
{
	private display : ImageDisplay;
	private options : Option[];

	constructor()
	{
		super();
		this.options = [
			new Option(0, "Yes"),
			new Option(1, "No"),
			new Option(2, "Maybe so")
		];

		this.display = new ImageDisplay(
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
			"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
		);
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

	GetDisplay(): TestDisplay
	{
		return this.display;
	}
}