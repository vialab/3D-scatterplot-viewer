import { PieChartDisplay } from "./PieChartDisplay";
import { PieChartData } from "./PieChartData";
import { UserInterface } from "../../io";
import { Color } from "../../ui/Color";

export class PieChartTutorialDisplay extends PieChartDisplay
{
	constructor()
	{
		let data : PieChartData[] = [
			new PieChartData("A", 1, new Color(215, 48, 39, 1)),
			new PieChartData("B", 1, new Color(252, 141, 89, 1)),
			new PieChartData("C", 1, new Color(254, 224, 144, 1)),
			new PieChartData("D", 1, new Color(224, 243, 248, 1)),
			new PieChartData("E", 1, new Color(145, 191, 219, 1)),
			new PieChartData("F", 1, new Color(69, 117, 180, 1))
		];

		super(data, data);

		this.width = 250;
		this.height = 250;
		this.margin = 15;
	}

	public Display(ui : UserInterface)
	{
		ui.ViewModeContent();
		let page = $(`<div style="text-align: center;">
			<hr />
			<p>You will be shown two pie charts.</p>
			<p>Choose whether the two pie charts represent the same data.</p>
			<hr />
		</div>`);
		let pieComparison = $(`<div style="display: flex"></div>`);
		let firstPieContainer = $(`<div style="flex: 1"></div>`);
		let secondPieContainer = $(`<div style="flex: 1"></div>`);

		pieComparison.append(firstPieContainer);
		pieComparison.append(secondPieContainer);

		page.prepend(pieComparison);

		ui.ContentContainer().append(page);

		this.displayPie(firstPieContainer, this.originalData);
		this.displayPie(secondPieContainer, this.comparedata);
	}
}