function Attacke(){
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var x,y;
	canvas.onmousemove = function(e){
		var rect = canvas.getBoundingClientRect();
		console.log(e.clientX + "  " + e.clientY);
		x = e.clientX-canvas.offsetLeft;
		y = e.clientY-canvas.offsetTop;
		paint();	
	}
	var active = false;
	canvas.onmousedown = function(){
		active = true;
	}
	canvas.onmouseup = function(){
		active = false;
	}
	function paint(){
		//console.log(x + " " + y);
		var farbe = document.getElementById("color").value;
		var dicke = document.getElementById("dicke").value;
		if(active){
			context.lineTo(x,y);
			context.strokeStyle = farbe;
			context.lineWidth = dicke;	
			context.stroke();
		}else{
			context.beginPath();
			context.moveTo(x,y);
		}
	}
}