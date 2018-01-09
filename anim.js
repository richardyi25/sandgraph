// Animation Queue
var anim = [];
// Whether animation is running automatically
var auto = false;

// Wrap into array
function push(a, b, c){
	anim.push([a, b, c]);
}

function delay(n){
	anim.push([n]);
}

function next(){
	var delay;
	while(true){
		// Exit if queue is empty
		if(anim.length == 0) return;
		var temp = anim.pop();

		// Delay object
		if(temp.length == 1){
			delay = temp[0];
			// Pop all subsequent delays if on manual
			if(!auto) while(anim[anim.length - 1].length == 1) anim.pop();
			break;
		}
		// Animation object
		else{
			var obj = temp[0], index = temp[1], val = temp[2];
			obj[index] = val;
		}
	}

	g.render();
	if(auto) window.setTimeout(next, delay);
}

function init(){
	delay(1000);
	// FIFO
	anim.reverse();
	if(auto) next();
}

$(document).keydown(function(e){
	if(e.which == 84){
		if(auto) auto = false;
		else{
			auto = true;
			next();
		}
	}
	else if(!auto) next();
});

$(document).click(next);
