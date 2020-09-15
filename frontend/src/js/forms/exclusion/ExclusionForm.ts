import { TaskDisplay, UserInterface } from "../../io";

export class ExclusionForm extends TaskDisplay
{
	public IsExcluded = false;

	public Display(screen: UserInterface): void
	{
		screen.ViewModeContent();
		
		if (this.IsExcluded)
			screen.ContentContainer().append("<p>This is the exclusion screen</p>");
	}
}