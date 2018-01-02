var g;

var nodes = [
	new Node(0, 150, 150, 'A', '', 70, 'red'),
	new Node(1, 200, 350, 'B', '', 70, 'red'),
	new Node(2, 450, 300, 'C', '', 70, 'red'),
	new Node(3, 475, 500, 'D', '', 70, 'red'),
	new Node(4, 650, 100, 'E', '', 70, 'red'),
	new Node(5, 750, 450, 'F', '', 70, 'red'),
	new Node(6, 900, 300, 'G', '', 70, 'red')
];
var edges = [
	new Edge(0, 1, 0, '', 10, 0, 'blue'),
	new Edge(0, 2, 0, '', 10, 0, 'blue'),
	new Edge(1, 2, 0, '', 10, 0, 'blue'),
	new Edge(1, 3, 0, '', 10, 0, 'blue'),
	new Edge(2, 3, 0, '', 10, 0, 'blue'),
	new Edge(2, 4, 0, '', 10, 0, 'blue'),
	new Edge(3, 5, 0, '', 10, 0, 'blue'),
	new Edge(3, 6, 0, '', 10, 0, 'blue'),
	new Edge(4, 6, 0, '', 10, 0, 'blue')
];

g = new Graph(nodes, edges);

function bfs(start){
	var cur, to;
	vist = [];
	for(var i = 0; i < nodes.length; i++)
		vist[i] = false;

	var queue = [start];
	vist[start] = true;
	g.push(nodes[start], 'cdata', 'V');
	
	while(queue.length > 0){
		cur = queue.shift();
		g.push(nodes[cur], 'color', 'green');
		for(var i = 0; i < g.adj[cur].length; i++){
			to = g.adj[cur][i].end.id;
			if(vist[to]) continue;
			vist[to] = true;
			g.push(nodes[to], 'cdata', 'V');
			queue.push(to);
		}
	}
}

function main(){
	g.render();
	init(g, 1000);
	bfs(4);
}

$(document).ready(main);
