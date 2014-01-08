
/*
 * author: Ray Gläske
 */

$(document).ready(function() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	elementList = [];
	lineList = [];
	labelList = [];
	markedSequenz = undefined;
	mousedown = false;
	amMalen = false;
	startAnker = undefined;
	var x,y;
	pos_hover = [0,0];
	markedElement = undefined;
	popup_zustand = false;
	mySocket = null;
	var myButton = document.getElementById('button');

	myButton.addEventListener('click', function(){
		addElement();
	}, false);

	var getMarkedSequenz = document.getElementById('getMarkedSequenz');

	getMarkedSequenz.addEventListener('click', function(){
		$.ajax({
			url: 'http://localhost:8080/api/v1/sequenzes/' + markedSequenz,
			type: 'GET',
			data: { email: document.getElementById('email').value },
			success: function(data){
				var anzahl = elementList.length;
				for(var i = 0; i < elementList.length; i++){
					elementList[i].element.remove();
				}
				elementList = [];
				lineList = [];
				context.clearRect(0, 0, canvas.width, canvas.height);
				firstElement = new Element(0);
				elementList.push(firstElement);
				if (data[0].elemente){
					for (var i = 0; i < data[0].elemente.length; i++){
						otherElement = new Element(data[0].elemente[i].element.id,
							data[0].elemente[i].element.position[0],
							data[0].elemente[i].element.position[1]);
						elementList.push(otherElement);
					}
				}
				if (data[0].linien){
					for (var j = 0; j < data[0].linien.length; j++){
						linie = new Linie(document.getElementById(data[0].linien[j].linie.anfang),
							document.getElementById(data[0].linien[j].linie.ende));
						lineList.push(linie);
					}
				}
			}
		});
		
	}, false);

	var openPopup = document.getElementById('openPopup');

	openPopup.addEventListener('click', function(){
		if(popup_zustand == false){
			
			$('#hintergrund').css('opacity', '0.7');
			$('#hintergrund').fadeIn('normal');	
			$('#popup').fadeIn('normal');
			popup_zustand = true;
		}
	});

	var saveSequenz = document.getElementById('saveSequenz');

	saveSequenz.addEventListener('click', function(){
		var elemente = [];
		var linien = [];

		for(var i = 1; i < elementList.length; i++){
			var element = { element: { id: i, position: [elementList[i].element.style.left,
				elementList[i].element.style.top] } };
			elemente.push(element);
		}

		for(var j = 0; j < lineList.length; j++){
			var linie = { linie: { anfang: lineList[j].ap.id, ende: lineList[j].ap_ende.id } };
			linien.push(linie);
		}
		$.ajax({
			url: 'http://localhost:8080/api/v1/sequenzes/',
			type: 'PUT',
			data: {
				elemente: elemente,
				linien: linien,
				email: document.getElementById('addEmail').value,
				name: document.getElementById('addSequenz').value
			},
			success: function(data){
				console.log('success');
				console.log(data);
				if(popup_zustand == true){
					$('#popup').fadeOut('normal');
					$('#hintergrund').fadeOut('normal');
				popup_zustand = false;
				}
				for( var i = 0; i < labelList.length; i++){
					labelList[i].remove();
				}
				labelList = [];
				lis = document.getElementById('liste');
				while (lis.firstChild) lis.removeChild(lis.firstChild);
				
				for( var i = 0; i < data.length; i++){
					$('<p> - <label class="tabelleninhalt" id="'+data[i].name+
						'" onclick="selectLabel(this)"><font color="#FF6E14">'+data[i].name+
						'</font></label></p>').appendTo('#liste');
					labelList.push(document.getElementById(data[i].name));
				}
			}
		});
	});

	var deleteMarkedSequenz = document.getElementById('deleteMarkedSequenz');

	deleteMarkedSequenz.addEventListener('click', function(){
		$.ajax({
			url: 'http://localhost:8080/api/v1/',
			type: 'DELETE',
			data: {
				email: document.getElementById('email').value,
				name: markedSequenz
			},
			success: function(data){
				console.log('delete')
			}
		});
	}, false);
	
	var getSequenzes = document.getElementById('getSequenzes');

	getSequenzes.addEventListener('click', function(){
		$.ajax({
			url: 'http://localhost:8080/api/v1/sequenzes/',
			type: 'GET',
			data: { email: document.getElementById('email').value },
			success: function(data){
				for( var i = 0; i < data.length; i++){
					$('<p> - <label class="tabelleninhalt" id="'+data[i].name+
						'" onclick="selectLabel(this)"><font color="#FF6E14">'+data[i].name+
						'</font></label></p>').appendTo('#liste');
					labelList.push(document.getElementById(data[i].name));
				}
				$('.db-stuff').show('slow');
			}
		});
	}, false);

	var closePopup = document.getElementById('closePopup');

	closePopup.addEventListener('click', function(){
		if(popup_zustand == true){
			$('#popup').fadeOut('normal');
			$('#hintergrund').fadeOut('normal');
			popup_zustand = false;
		}
	});
});

selectLabel = function(lb){
	for( var i = 0; i < labelList.length; i++){
		labelList[i].style.backgroundColor = 'transparent';
	}
	lb.style.backgroundColor = '#42C4FF';
	lb.style.borderRadius = '5px';
	markedSequenz = lb.id;
}

addElement = function(){
	if(elementList.length==0){
		firstElement = new Element(0);
		elementList.push(firstElement);
	}else{
		otherElement = new Element(elementList.length);
		elementList.push(otherElement);
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


