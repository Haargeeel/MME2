"use strict";

//
// Element mit Ankerpunkten
//

var Element = function(nummer, xPos, yPos){

	if(nummer == 0){
		$('<div id="startElement"></div>')
			.appendTo('#canvas_wrapper');
		$('<div class="ap_links" id="ap_links0"></div>')
			.appendTo($('#startElement'));
		$('<div class="ap_rechts" id="ap_rechts0"></div>')
			.appendTo($('#startElement'));
		$('<div class="ap_unten" id="ap_unten0"></div>')
			.appendTo($('#startElement'));
		$('<div class="ap_oben" id="ap_oben0"></div>')
			.appendTo($('#startElement'));
		this.element = document.getElementById('startElement');
		this.xPos = xPos || '300px';
		this.yPos = yPos || '275px';
	}else{
		$('<div class="element" id="element' + nummer + 
			'"></div>').appendTo('#canvas_wrapper');
		$('<div class="ap_links" id="ap_links' + nummer +
			'"></div>').appendTo($('#element' + nummer));
		$('<div class="ap_rechts" id="ap_rechts' + nummer +
			'"></div>').appendTo($('#element' + nummer));
		$('<div class="ap_unten" id="ap_unten' + nummer +
			'"></div>').appendTo($('#element' + nummer));
		$('<div class="ap_oben" id="ap_oben' + nummer +
			'"></div>').appendTo($('#element' + nummer));
		this.element = document.getElementById('element' + nummer);
		this.xPos = xPos || '400px';
		this.yPos = yPos || '100px';
	}
		
	this.element.style.left = this.xPos;
	this.element.style.top = this.yPos;
	this.id = nummer;
	$('.element').draggable({ containment: "parent"});
	this.ap_links = document.getElementById('ap_links' + nummer);
	this.ap_rechts = document.getElementById('ap_rechts' + nummer);
	this.ap_unten = document.getElementById('ap_unten' + nummer);
	this.ap_oben = document.getElementById('ap_oben' + nummer);

	//
	// EventListener anmelden
	//
	
	this.element.addEventListener('click', function(){
		markiert(this);
	}, false);

	this.ap_links.addEventListener('mouseover', function(){
		this.style.opacity = '1.0';
		console.log(getPosition(this));
		pos_hover = getPosition(this);
		if(mousedown && amMalen){
			var linie = new Linie(startAnker, this);
			lineList.push(linie);
			amMalen = false;
		}
	}, false);
	this.ap_links.addEventListener('mouseout', function(){
		this.style.opacity = '0.0';
	}, false);	
	this.ap_links.addEventListener('mousedown', function(){
		starteMalen(this);
	}, false);

	this.ap_rechts.addEventListener('mouseover', function(){
		this.style.opacity = '1.0';
		pos_hover = getPosition(this);
		if(mousedown && amMalen){
			var linie = new Linie(startAnker, this);
			lineList.push(linie);
			amMalen = false;
		}
	}, false);
	this.ap_rechts.addEventListener('mouseout', function(){
		this.style.opacity = '0.0';
	}, false);	
	this.ap_rechts.addEventListener('mousedown', function(){
		starteMalen(this);
	}, false);

	this.ap_unten.addEventListener('mouseover', function(){
		this.style.opacity = '1.0';
		pos_hover = getPosition(this);
		if(mousedown && amMalen){
			var linie = new Linie(startAnker, this);
			lineList.push(linie);
			amMalen = false;
		}
	}, false);
	this.ap_unten.addEventListener('mouseout', function(){
		this.style.opacity = '0.0';
	}, false);	
	this.ap_unten.addEventListener('mousedown', function(){
		starteMalen(this);
	}, false);

	this.ap_oben.addEventListener('mouseover', function(){
		this.style.opacity = '1.0';
		pos_hover = getPosition(this);
		if(mousedown && amMalen){
			var linie = new Linie(startAnker, this);
			lineList.push(linie);
			amMalen = false;
		}
	}, false);
	this.ap_oben.addEventListener('mouseout', function(){
		this.style.opacity = '0.0';
	}, false);	
	this.ap_oben.addEventListener('mousedown', function(){
		starteMalen(this);
	}, false);
	
};


