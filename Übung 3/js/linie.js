"use strict";

var Linie = function(anfang, ende){
	this.ap = anfang;
	this.ap_ende = ende;
	this.coords_anfang = getPosition(this.ap);
	if(this.ap_ende)
		this.coords_ende = getPosition(this.ap_ende);
	else
		this.coords_ende = anfang;
};

Linie.prototype.draw = function(){
	context.beginPath();
	context.moveTo(getPosition(this.ap)[0], getPosition(this.ap)[1]);
	context.lineTo(getPosition(this.ap_ende)[0], getPosition(this.ap_ende)[1]);
	context.stroke();
};

Linie.prototype.getAnkerPosition = function(ap){
	var tmp = document.getElementById(ap.id);
}
