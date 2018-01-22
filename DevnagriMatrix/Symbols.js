// This is the class using which we can create symbols in our stream
function Symbols(x,y,speed,first,last){
	
	this.speed = speed;                                    // Attribute for the speed of the stream
	this.x = x;                                            // Attribute for the x position of the symbol
	this.y = y;                                            // Attribute for the y position of the symbol
	this.value = 0;                                        // Attribute to store unicode value of the symbol
	this.switchInterval = round(random(2,20));             // Attribute to store the switching rate of symbols
	this.first = first;                                    // Attribute to track the first symbol of the stream
	this.last = last;                                      // Attribute to track the last symbol of the stream
	
    // This function will change the encoding of the symbol according to the set switching interval
	this.setRandomSymbols = function(){
		if(frameCount % this.switchInterval == 0){
			this.value = String.fromCharCode(
				0x0960 + round(random(6,15))
			);
		}
	}
	
    // Renderer function for showing the symbols and making it rain!
	this.render = function(){
		text(this.value, this.x, this.y);
		this.setRandomSymbols();
		this.rain();
	}
	
    // This function will provide veritcal motion to the symbols
	this.rain = function(){
		this.y = (this.y >= height) ? 0 : this.y += this.speed; 
	}

}
