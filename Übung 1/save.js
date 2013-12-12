
function Attacke(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var farbe = document.getElementById("color").value;
	var dicke = document.getElementById("dicke").value;
	var altX;
	var altY;
	var geklickt = false;
	var mouseX, mouseY;
	console.log(farbe);
	
	function getMousePos(e){
		var rect = this.canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};	
	}
	
	function getMaus(e){
	
	if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }	
	}
	
	canvas.addEventListener('mousedown', function(e) {
		geklickt = true;
		//console.log(this.geklickt);
	}, false);
	canvas.addEventListener('mouseup', function(e) {
		geklickt = false;
		altX = undefined;
		//console.log(this.geklickt);
	}, false);
	canvas.addEventListener('mousemove', function(e) {
		//var mousePos = getMousePos(e);
		getMaus(e);
		malen();
		//console.log(mousePos.x + " " + mousePos.y);	
	}, false);
	
	
	function malen(){
		//x1 = mousePos.x;
		//y1 = mousePos.y;
		x1 = mouseX;
		y1 = mouseY;
		/*farbe = document.getElementById("color").value;
		console.log(geklickt);
		if(geklickt == true && altX != undefined){
			context.beginPath();
			context.moveTo(x,y);
			context.lineTo(altX,altY);
			context.lineWidth = document.getElementById("dicke").value;
			context.strokeStyle = farbe;
			context.stroke();	
		}
		altX = x;
		altY = y;*/
		if(geklickt == false){
			context.beginPath();
			context.moveTo(x1,y1)	
		}
		if(geklickt == true){
			//context.beginPath();
			context.lineTo(x1,y1);
			context.stroke();	
			console.log(x1 + "  " + y1); 
		}
	}
}