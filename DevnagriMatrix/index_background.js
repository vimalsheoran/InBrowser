var canvas;                     // Creating a variable to reference the canvas
var symbolSize = 30;            // Creating a variable to store the size of the streaming symbols
var streams = [];               // Creating an array to hold multiple streams

// Resize the canvas if the window is resized
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

// Setup function
function setup() { 
	canvas = createCanvas(windowWidth, windowHeight);      // Creating canvas
	canvas.position(0,0);                                  // Setting the canvas on the webpage
	canvas.style('z-index','-1');                          // Now you can use this as a background for your website
	var x = 0;                                             
	for(i = 0; i <= width / symbolSize; i++){              // Loop through the width of the screen to generate streams at a separation of symbolsize 
		var stream = new Stream();
		stream.generateSymbols(x,random(-height,0));
		streams.push(stream);
		x += symbolSize;
	}
	textSize(symbolSize);                                  // Set the size of the text to be drawn equal to the desired symbolsize
} 

// Draw function to render streams on the canvas
function draw() { 
	background(0,200);
	streams.forEach(function(stream){                      // Loop through the streams array and render each stream
		stream.render();
	});
}

