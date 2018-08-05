const LEVEL_HEIGHT = 0.25;
const LEVEL_THICKNESS = 15;
const LEVEL_COLOR = 0;

function Level(x){
	this.x = x;
	this.yBottom = height/2 + 100;
	this.levelHeight = LEVEL_HEIGHT;

	this.drawLevel = function(){
		strokeWeight(LEVEL_THICKNESS);
		stroke(LEVEL_COLOR);
		line(this.x, this.yBottom, this.x, (this.yBottom - this.levelHeight));
	}

	this.updateLevelHeight = function(updateOffset){
		this.levelHeight = updateOffset;
	}
}

const LEVEL_STARTING_X_POSITION = 100;
const LEVEL_SPACING = 30;
const NUMBER_OF_LEVELS = 40;
const FREQ_OFFSET = 25;
const AMPLITUDE_ATTENUATION = 5;

var levels = [];
var fft;
var mySound;
fft = new p5.FFT();

mySound = new p5.AudioIn();

function preload(){
	mySound.connect(fft);
	mySound.start();
}

function setup(){
	smooth();
	createCanvas(windowWidth, windowHeight + 500);
	for(var i = 0; i < NUMBER_OF_LEVELS; i++){
		levels[i] = new Level(LEVEL_STARTING_X_POSITION+(i*LEVEL_SPACING));
	}
	fft.setInput(mySound);
}

function draw(){
	background(random(150, 200),0,0);
	var spectrum = fft.analyze();
	for(var i = 0; i < NUMBER_OF_LEVELS; i++){
		levels[i].drawLevel();
		levelHeight = map(spectrum[i*FREQ_OFFSET], 0, 255, 0, height);
		levels[i].updateLevelHeight(levelHeight/AMPLITUDE_ATTENUATION);
	}
}
