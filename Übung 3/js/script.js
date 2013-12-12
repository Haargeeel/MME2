$(document).ready(function() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	elementList = [];
	lineList = [];
	mousedown = false;
	amMalen = false;
	startAnker = undefined;
	var x,y;
	pos_hover = [0,0];
	markedElement = undefined;
	var myButton = document.getElementById('button');

	myButton.addEventListener('click', function(){
		addElement();
	}, false);
});

addElement = function(){
	if(elementList.length==0){
		firstElement = new Element(0);
		elementList.push(firstElement);
	}else{
		otherElement = new Element(elementList.length);
		elementList.push(otherElement);
		console.log(elementList);
	}
}

getPosition = function(item){
		var rect = item.getBoundingClientRect();
		var x = rect.left - canvas.offsetLeft + (rect.width/2);
		var y = rect.top-canvas.offsetTop+(rect.height/2);
		return [x,y];
	}

markiert = function(element){
	if(element == markedElement){
		console.log(element.id);
	}
	for(var i = 0; i < elementList.length; i++){
		elementList[i].element.style.boxShadow = "";	
		for(var j = 0; j < elementList[i].element.childNodes.length; j++){
			elementList[i].element.childNodes[j].style.opacity = "0.0";
		}
	}
	element.style.boxShadow = "0 0 5px #0000FF";
	for(var i = 0; i < element.childNodes.length; i++){
		element.childNodes[i].style.opacity = "1.0";
	}
	markedElement = element;
}


starteMalen = function(ap){
	mousedown = true;
	amMalen = true;
	startAnker = ap;
	$('.element').draggable('disable');
}

onmousemove = function(e){
	context.clearRect(0, 0, canvas.width, canvas.height);
	var i = 0;
	while(lineList[i]){
		lineList[i].draw();
		i++;
	}	
	x = e.clientX - canvas.offsetLeft;
	y = e.clientY - canvas.offsetTop;
	if(mousedown){
		context.beginPath();
		context.moveTo(pos_hover[0], pos_hover[1]);
		context.lineTo(x, y);
		context.stroke();	
	}
}

onmouseup = function(e){
	mousedown = false;
	$('.element').draggable('enable');
}


