import * as d3 from "d3";
import { TaskDisplay, UserInterface } from "../../io";
import { PieChartData } from "./PieChartData";
import { PieChart } from "./PieChart";
import { IdGenerator } from "../../util/IdGenerator";

export class PieChartDisplay extends TaskDisplay
{
	private originalData : PieChartData[];
	private comparedata : PieChartData[];

	constructor(data : PieChartData[], compareData : PieChartData[])
	{
		super();
		this.originalData = data;
		this.comparedata = compareData;
	}

	Display(screen: UserInterface): void
	{
		screen.ViewModeComparison();
		this.displayPie(screen.OriginalViewContainer(), this.originalData);
		this.displayPie(screen.ComparisonViewContainer(), this.comparedata);
	}

	private displayPie(container : JQuery<HTMLElement>, drawData : PieChartData[]) : void
	{
		let containerId : string = IdGenerator.Generate();
		container.append(`<div id="${containerId}" class="center-content" style="width: 100%; height: 100%;"></div>`);

		var width = 450,
			height = 450,
			margin = 40;

		var radius = Math.min(width, height) / 2 - margin

		var svg = d3.select("#" + containerId).append("svg")
			.attr("width", width)
			.attr("height", height)
			;
		
		var graphic = svg.append("g")
			.attr("transform", "translate(" + width/2 + "," + height/2 + ")");

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
					return drawData[i].Colour.HtmlColour();
				}
			)
			.attr("stroke", "white")
			.style("stroke-width", "1px")
			;
	}
}