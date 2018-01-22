// Creating a stream class for creating streams
function Stream(){
	
	this.symbols = [];                                 // This is an array that will hold symbols
	this.totalSymbols = round(random(5,20));           // Set the total number of symbols in a stream as random
	this.streamSpeed = (random(5,10));                 // Set the stream of the speed to be random
	
    // This is a function that will generate symbols in the stream
	this.generateSymbols = function(x,y){
		var first = true;                                                 // Track the status of first and last symbols
		var last = false;
		for(var i = 0; i <= this.totalSymbols; i++){                      // Add symbols to the stream by pushing them into the symbols array
			var symbol = new Symbols(x,y,this.streamSpeed, first, last);
			symbol.setRandomSymbols();
			this.symbols.push(symbol);
			y -= symbolSize;                                             // Add thee new symbol after a particular separation
			first = false;
			if(i == this.totalSymbols - 1){
				last = true;
			}
		}
	}
    
    // Renderer function for rendering an entire stream on the canvas
	
	this.render = function(){
		this.symbols.forEach(function(symbol){
			if(symbol.first == true || symbol.last == true){
				fill(0,225,123);
			}
			else{
				fill(70, 212, 137);
			}
			text(symbol.value, symbol.x, symbol.y);
			symbol.setRandomSymbols();
			symbol.rain();
		});
	}
	
}