export abstract class TestDisplay
{
	abstract Display(originalContainer: JQuery<HTMLElement>, comparisonContainer: JQuery<HTMLElement>) : void;
}