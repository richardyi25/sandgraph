var print;
var c;

// Node Class
function Node(id, x, y, data, cdata, size, color){
	this.id = id;
	this.x = x;
	this.y = y;
	this.data = data;
	this.cdata = cdata;
	this.size = size;
	this.color = color;
}

// Edge Class
function Edge(start, end, dir, data, thick, fsize, color){
	this.start = start;
	this.end = end;
	this.dir = dir;
	this.data = data;
	this.thick = thick;
	this.fsize = fsize;
	this.color = color;

	this.update = function(){
		// Angle from start to end is atan2
		this.alpha = Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x) + (2 * Math.PI);
		// Angle but the other way
		this.beta = (this.alpha + Math.PI) % (Math.PI * 2);
		// Calculate the "real" endpoints of the this
		// This is offset by the size of the nodes and the angle of the this
		// 8/15 to account for outer circle thickness
		// 1.6 is to account for arrowhead
		this.rx1 = this.start.x + this.start.size * 8/15 * Math.cos(this.alpha);
		this.ry1 = this.start.y + this.start.size * 8/15 * Math.sin(this.alpha);
		this.rx2 = this.end.x + this.end.size * 8/15 * Math.cos(this.beta);
		this.ry2 = this.end.y + this.end.size * 8/15 * Math.sin(this.beta);
		this.rx3 = this.end.x + (this.end.size * 8/15 + this.thick * 1.6) * Math.cos(this.beta);
		this.ry3 = this.end.y + (this.end.size * 8/15 + this.thick * 1.6) * Math.sin(this.beta);
	}

	this.update();
}

// Graph Class
function Graph(nodes, edges){
	var edge, rev;
	this.nodes = nodes;
	this.adj = [];
	this.queue = [];

	for(var i = 0; i < nodes.length; i++)
		this.adj[i] = [];
	
	for(var i = 0; i < edges.length; i++){
		edge = edges[i];
		edge.start = this.nodes[edge.start];
		edge.end = this.nodes[edge.end];
		this.adj[edge.start.id].push(edge);
		if(edge.dir == 0){
			rev = new Edge(edge.end, edge.start, 0, edge.data, edge.thick, edge.fsize, edge.color);
			this.adj[edge.end.id].push(rev);
		}
	}

	// Draw the graph to the canvas
	this.render = function(){
		var node, edge, data, cdata;
		var perp;

		//Clear screen
		c.clearCanvas();

		// Draw Edges
		// Nested for loop that loops through adjacency list
		for(var i = 0; i < this.adj.length; i++){ for(var j = 0; j < this.adj[i].length; j++){
			edge = this.adj[i][j];

			// Update some angle and math values
			edge.update();
			// Convert to string
			data = "" + edge.data;

			// Draw edge itself
			c.drawLine({
				x1: edge.rx1,
				y1: edge.ry1,
				// Draw arrowed edges a bit shorter
				x2: edge.dir ? edge.rx3 : edge.rx2,
				y2: edge.dir ? edge.ry3 : edge.ry2,
				strokeStyle: edge.color,
				strokeWidth: edge.thick,
				endArrow: edge.dir,
				arrowRadius: edge.thick * 3,
			});

			// Some trig to determine where the weight is drawn

			// Add pi/2 to make it perpendicular (clockwise)
			perp = (edge.alpha + Math.PI / 2);

			// Weight is drawn perpendicular to midpoint
			// The distance scales with edge thickness and font size
			// Use cos and sin to find x and y distances
			wx = (edge.rx1 + edge.rx2) / 2 + (edge.thick + edge.fsize + 10) / 2 * Math.cos(perp);
			wy = (edge.ry1 + edge.ry2) / 2 + (edge.thick + edge.fsize + 10) / 2 * Math.sin(perp);

			// Draw edge weight
			c.drawText({
				text: data,
				x: wx,
				y: wy,
				rotate: edge.beta * 180 / Math.PI,
				fontSize: edge.fsize,
				fromCenter: true,
				fontFamily: 'Arial',
				fillStyle: edge.color
			});
		}}

		// Draw nodes
		for(var i = 0; i < this.nodes.length; i++){
			node = this.nodes[i];
			// Convert to strings
			data = "" + node.data;
			cdata = "" + node.cdata;

			// Draw node body
			c.drawEllipse({
				x: node.x,
				y: node.y,
				width: node.size,
				height: node.size,
				strokeStyle: node.color,
				strokeWidth: node.size/15,
				fillStyle: 'white'
			});

			// Draw in-node text
			c.drawText({
				text: data,
				x: node.x,
				y: node.y,
				fromCenter: true,
				fillStyle: 'black',
				// Scales based on size of node and length of text
				fontSize: node.size * 0.85 / Math.pow(data.length, 0.8),
				fontFamily: 'Arial'
			});

			// Draw out-node text
			c.drawText({
				text: cdata,
				x: node.x - node.size / 2,
				y: node.y - node.size / 2,
				fromCenter: true,
				fillStyle: 'black',
				// Scales based on size of node and length of text
				fontSize: node.size * 0.35 / Math.pow(cdata.length, 0.8),
				fontFamily: 'Arial'
			});
		}

	}

	// Add animation to the queue
	this.push = function(obj, index, val){
		this.queue.push([obj, index, val]);
	}
}

// Resolve an animation on a delay
function init(g, delay){
	window.setInterval(function(){
		if(g.queue.length == 0)
			return;

		var obj = g.queue[0][0], index = g.queue[0][1], val = g.queue[0][2];
		obj[index] = val;
		g.queue.shift();
		g.render();
	}, delay);
}

// Variable binding
function main(){
	c = $('canvas');
	print = console.log;
}

$(document).ready(main);
