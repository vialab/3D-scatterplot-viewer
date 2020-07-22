/**
 * Wrapper file for d3-3d since it doesn't have TypeScript typings
 */

var d3 = require("d3");
var d33d = require("d3-3d");

module.exports = {
	Draw
};

function Draw(containerSelector, points, rotation, scale)
{
	let j = 16;
	var rn1 = Math.floor(d3.randomUniform(1, 12)());
	points = [];
	var eq = function(x, z){
		return Math.cos(Math.sqrt(x*x+z*z)/5*Math.PI)*rn1;
	};
	for(var z = -j; z < j; z++){
		for(var x = -j; x < j; x++){
			points.push({x: x, y: eq(x, z), z: z});
		}
	}

	let container = d3.select(containerSelector);
	let svg = container.append("svg");
	let graphic = svg.append("g");

	var surface = d33d._3d()
		.scale(10)
		.x(function(d){ return d.X; })
		.y(function(d){ return d.Y; })
		.z(function(d){ return d.Z; })
		.origin([480, 250])
		.rotateY(rotation.y)
		.rotateX(rotation.x)
		.shape('SURFACE', j*2);
	
	let data = surface(points);

	var planes = graphic
		.selectAll('path')
		.data(data, function(d){ return d.plane; });

	planes
		.enter()
		.append('path')
		.attr('class', '_3d')
		.attr('fill', colour)
		.attr('opacity', 0)
		.attr('stroke-opacity', 0.1)
		.merge(planes)
		.attr('stroke', 'black')
		.attr('opacity', 1)
		.attr('fill', colour)
		.attr('d', surface.draw);
	
	planes.exit().remove();

	d3.selectAll('._3d').sort(surface.sort);
}

function colour(p)
{
	return "rgba(0,0,0,1)";
}