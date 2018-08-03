function Level(x){
	this.x = x;
	this.yBottom = height/2 + 100;
	this.levelHeight = 0.25;

	this.drawLevel = function(){
		strokeWeight(15);
		stroke(0);
		console.log(this.levelHeight);
		line(this.x, this.yBottom, this.x, (this.yBottom - this.levelHeight));
	}

	this.updateLevelHeight = function(updateOffset){
		this.levelHeight = updateOffset;
	}

	this.resetLevelHeight = function(){
		this.levelHeight = 0.25;
	}
}

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
	//mySound.setSource(0);
	createCanvas(windowWidth, windowHeight + 500);
	for(var i = 0; i < 40; i++){
		levels[i] = new Level(100+(i*30));
	}
	//mySound.connect();
	//mySound.start();
	fft.setInput(mySound);
}

function draw(){
	background(random(150, 200),0,0);
	var spectrum = fft.analyze();
	for(var i = 0; i < 40; i++){
		levels[i].drawLevel();
		levelHeight = map(spectrum[i*15], 0, 255, height, 0)
		levels[i].updateLevelHeight(levelHeight/2);
	}
}
