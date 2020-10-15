import * as d3 from "d3";
import { TaskDisplay, UserInterface } from "../../io";
import { PieChartData } from "./PieChartData";
import { PieChartController } from "./PieChartController";
import { IdGenerator } from "../../util/IdGenerator";
import { OptionButton } from "../../ui/components/OptionButton";

export class PieChartDisplay extends TaskDisplay
{
	protected originalData : PieChartData[];
	protected comparedata : PieChartData[];

	protected width = 450;
	protected height = 450;
	protected margin = 40;

	buttons : OptionButton[];

	constructor(data : PieChartData[], compareData : PieChartData[], buttons : OptionButton[])
	{
		super();
		this.originalData = data;
		this.comparedata = compareData;
		this.buttons = buttons;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();
		this.displayPie(screen.OriginalViewContainer(), this.originalData);
		this.displayPie(screen.ComparisonViewContainer(), this.comparedata);
		
		for (let i = 0; i < this.buttons.length; i++)
			screen.OptionsContainer().append(this.buttons[i].Element());
	}

	protected displayPie(container : JQuery<HTMLElement>, drawData : PieChartData[]) : void
	{
		let containerId : string = IdGenerator.Generate();
		container.append(`<div id="${containerId}" class="center-content" style="width: 100%; height: 100%;"></div>`);

		var radius = Math.min(this.width, this.height) / 2 - this.margin

		var svg = d3.select("#" + containerId).append("svg")
			.attr("width", this.width)
			.attr("height", this.height)
			;
		
		var graphic = svg.append("g")
			.attr("transform", "translate(" + this.width/2 + "," + this.height/2 + ")");

		let values = drawData.map(d => d.Value);
		let arcs = d3.pie().sort(null)(values);

		let arc = d3.arc()
			.innerRadius(0)
			.outerRadius(radius);

		graphic.selectAll("arc")
			.data(arcs)
			.enter()

			.append("g")
			.attr("class", "arc")

			.append("path")
			.attr('d', <any>arc)

			.attr('fill',
				function(d : any, i : number)
				{
					return drawData[i].Color.HtmlColour();
				}
			)
			.attr("stroke", "white")
			.style("stroke-width", "1px")
			;
	}
}