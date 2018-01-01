var g = new Graph();

function rint(a, b){
	return Math.floor(a + (b - a + 1) * Math.random());
}

function main(){
	g.nodes.push(new Node(350, 200, 1, 10, 200, 'yellow'));
	g.nodes.push(new Node(100, 100, 2, 20, 100, 'blue'));
	g.nodes.push(new Node(200, 400, 3, 30, 50, 'red'));
	g.edges.push(new Edge(g.nodes[1], g.nodes[0], 1, 'data', 3, 30, 'green'));
	g.edges.push(new Edge(g.nodes[2], g.nodes[0], 0, 'weight', 5, 30, 'purple'));
	g.edges.push(new Edge(g.nodes[1], g.nodes[2], 1, 'text', 10, 100, 'orange'));
//	window.setInterval(function(){
//		for(var i = 0; i < 3; i++){
//			g.nodes[i].x = rint(0, 1200);
//			g.nodes[i].y = rint(0, 675);
//		}
//		g.render();
//	}, 500);
	g.render();
}

$(document).ready(main);
