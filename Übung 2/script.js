$(document).ready(function() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	elementList = [];
	lineList = [];
	mousedown = false;
	amMalen = false;
	var startAnker;
	var pos_hover;
	var x,y;
	var markedElement;
});

function addElement(){
	if(elementList.length==0){
		$("<div id='startElement'></div>").appendTo("body");
		var name2 = "#startElement";
		var ankerPunkt_links = "<div class='ap_links' id='ap_links" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_links).appendTo(name2);
		var ankerPunkt_rechts = "<div class='ap_rechts' id='ap_rechts" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)'  onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_rechts).appendTo(name2);
		var ankerPunkt_unten = "<div class='ap_unten' id='ap_unten" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_unten).appendTo(name2);
		var ankerPunkt_oben = "<div class='ap_oben' id='ap_oben" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_oben).appendTo(name2);
		var a = [document.getElementById('ap_links0'), document.getElementById('ap_rechts0'), document.getElementById('ap_oben0'), document.getElementById('ap_unten0')];
		erstes = new Element(document.getElementById('startElement'), a);
		elementList.push(erstes);
		markedElement = erstes;
	}else{
		var name = '<div class="element" id="element' + elementList.length + '" onclick="markiert(this)"></div>';
		$(name).appendTo("body");
		var name2 = "#element" + elementList.length;
		var name3 = "element" + elementList.length;
		var ankerPunkt_links = "<div class='ap_links' id='ap_links" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_links).appendTo(name2);
		var ap_links = "ap_links" +elementList.length;
		var ankerPunkt_rechts = "<div class='ap_rechts' id='ap_rechts" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_rechts).appendTo(name2);
		var ap_rechts = "ap_rechts" + elementList.length;
		var ankerPunkt_unten = "<div class='ap_unten' id='ap_unten" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_unten).appendTo(name2);
		var ap_unten = "ap_unten" + elementList.length;
		var ankerPunkt_oben = "<div class='ap_oben' id='ap_oben" + elementList.length + "' onmouseover='einblenden(this)' onmouseout='ausblenden(this)' onmousedown='starteMalen(this)'></div>";
		$(ankerPunkt_oben).appendTo(name2);
		var ap_oben = "ap_oben" + elementList.length;
		$(".element").draggable({ containment: "parent"});
		var a = [document.getElementById(ap_links), document.getElementById(ap_rechts), document.getElementById(ap_oben), document.getElementById(ap_unten)];
		var element = new Element(document.getElementById(name3), a);
		elementList.push(element);
	}
}

function markiert(element){
	if(element == markedElement){
		console.log(element.id);
	}
	for(var i = 1; i < elementList.length; i++){
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

function einblenden(ap){
	ap.style.opacity = "1.0";
	var wort = ap.id.replace(/\d/g, "");
	var zahl = ap.id.replace(/\D/g, "");	
	var ap_nr;
	switch(wort){
		case 'ap_links':
		ap_nr = 0;
		var pos = elementList[zahl].getPosition(elementList[zahl].ap_links);
		break;
		case 'ap_rechts':
		ap_nr = 1;
		var pos = elementList[zahl].getPosition(elementList[zahl].ap_rechts);
		break;
		case 'ap_oben':
		ap_nr = 2;
		var pos = elementList[zahl].getPosition(elementList[zahl].ap_oben); 
		break;
		case 'ap_unten':
		ap_nr = 3;
		var pos = elementList[zahl].getPosition(elementList[zahl].ap_unten);
		break;
	}
	pos_hover = pos;
	if(mousedown && amMalen){
		var linie = new Linie(startAnker, ap);	
		lineList.push(linie);
		amMalen = false;
	}
}

function getElement(ap){
	var wort = ap.id.replace(/\d/g, "");
	var zahl = ap.id.replace(/\D/g, "");
	var ap_nr;
	switch(wort){
		case 'ap_links':
		ap_nr = 0;
		break;
		case 'ap_rechts':
		ap_nr = 1;
		break;
		case 'ap_oben':
		ap_nr = 2;
		break;
		case 'ap_unten':
		ap_nr = 3;
		break;
	}
	var e = elementList[zahl];
	return e;	
}

function starteMalen(ap){
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

function ausblenden(ap){
	ap.style.opacity = "0.0";
}
