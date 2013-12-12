"use strict";

var Linie = function(anfang, ende){
	this.ap = anfang;
	this.ap_ende = ende;
	this.coords_anfang = this.getPos(this.ap);
	if(this.ap_ende)
		this.coords_ende = this.getPos(this.ap_ende);
	else
		this.coords_ende = anfang;
};


Linie.prototype.getPos = function(ap){
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
	var pos = elementList[zahl].getPosition(elementList[zahl].aps[ap_nr]);
	return pos;
};

Linie.prototype.draw = function(){
	context.beginPath();
	context.moveTo(this.getPos(this.ap)[0], this.getPos(this.ap)[1]);
	context.lineTo(this.getPos(this.ap_ende)[0], this.getPos(this.ap_ende)[1]);
	context.stroke();
};
