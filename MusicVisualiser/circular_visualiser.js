const LEVEL_HEIGHT = 0.25;
const LEVEL_THICKNESS = 15;
const LEVEL_COLOR = 0;

function Level(x, y, angle, radius){
	this.x = x;
	this.y = y;
	this.updatedX = this.x;
	this.updatedY = this.y;
	this.angle = angle;
	this.radius = radius;
	this.levelHeight = LEVEL_HEIGHT;

	this.drawLevel = function(){
		strokeWeight(LEVEL_THICKNESS);
		stroke(LEVEL_COLOR);
		line(this.x, this.y, this.updatedX, this.updatedY);
	}

	this.updateLevelHeight = function(updateOffset){
		this.updatedX = cos(radians(this.angle)) * (this.radius + updateOffset);
		this.updatedY = sin(radians(this.angle)) * (this.radius + updateOffset);
	}

}

const CANVAS_VERTICAL_OFFSET = 500;
const NUMBER_OF_LEVELS = 40;
const RADIUS = 120;
const FREQ_OFFSET = 5;
const AMPLITUDE_ATTENTUATION = 5;

var levels = [];
var fft;
var mySound;
var noOfLevels;
var angularSpacing;
var visualiserRadius;

fft = new p5.FFT();
mySound = new p5.AudioIn();

function preload(){
	mySound.connect(fft);
	mySound.start();
}

function setup(){
	smooth();
	translate(windowWidth/2, windowHeight/2)
	createCanvas(windowWidth, windowHeight + CANVAS_VERTICAL_OFFSET);
	fft.setInput(mySound);
	noOfLevels = NUMBER_OF_LEVELS;
	angularSpacing = 360/noOfLevels;
	visualiserRadius = RADIUS;
	var angle = 0;
	var i = 0;
	while(angle < 360){
		var xPos = cos(radians(angle)) * visualiserRadius;
		var yPos = sin(radians(angle)) * visualiserRadius;
		levels[i] = new Level(xPos, yPos, angle, visualiserRadius)
		angle += angularSpacing;
		i++;
	}
}

function draw(){
	translate(windowWidth/2, windowHeight/2);
	background(random(0,255),random(0,255),random(0,255));
	var spectrum = fft.analyze();
	console.log(levels.length);
	for(var i = 0; i < NUMBER_OF_LEVELS; i++){
		levels[i].drawLevel();
		levelHeight = map(spectrum[i*FREQ_OFFSET], 0, 255, 0, height);
		levels[i].updateLevelHeight(levelHeight/AMPLITUDE_ATTENTUATION);
	}
}
