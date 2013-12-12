"use strict";

var Element = function(name, ankerpunkte){
	this.element = name;
	this.ap_links = ankerpunkte[0];
	this.ap_rechts = ankerpunkte[1];
	this.ap_oben = ankerpunkte[2];
	this.ap_unten = ankerpunkte[3];
	this.aps = [this.ap_links, this.ap_rechts, this.ap_oben, this.ap_unten];

};

Element.prototype.getPosition = function(item){
	var rect = item.getBoundingClientRect();
	var x = rect.left - canvas.offsetLeft + (rect.width/2);
	var y = rect.top-canvas.offsetTop+(rect.height/2);
	return [x,y];
};
