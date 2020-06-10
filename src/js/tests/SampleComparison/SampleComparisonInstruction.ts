import { SampleComparison } from "./SampleComparison";

export class SampleComparisonInstruction extends SampleComparison
{
	GetTitle(): string
	{
		return "Instructions"
	}
	GetPrompt() : string
	{
		return "You will be show two images like above, and will be asked whether they are equivalent.<br />"
		+ "This is a sample of the test, the results will not be tracked. Choose an option to continue.";
	}

	IsConfidenceTracked(): boolean
	{
		return false;
	}
	IsResultsTracked(): boolean
	{
		return false;
	}
}