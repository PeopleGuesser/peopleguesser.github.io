var loadedFont;
var inputString;
var w, h, centerx, centery;

var PATH = "https://peopleguesser.github.io/assets/";//"assets/";

function preload() {

	//Load fonts and images
	loadedFont = loadFont(PATH + "font.ttf");
}

function setup() {

	//Initialize
	inputString = "";

	//Create Canvas
	updateScreen();
	createCanvas(w, h);
}

function draw() {

	// Clear Screen
	updateScreen();
	background(250);
	strokeWeight(0);
	var time = millis();

	//Strikes

	//Photo
	var sizew, sizeh, posy, posx;
	sizeh = min(w*0.8, h*0.4);
	sizew = sizeh;
	posy = (h*0.4);

	  sizew = w*2;
	  fill(230);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.025);
	  sizew = sizeh;
	  fill(20);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.025);

	//Input Field
	posy = (h*0.72);

	  sizeh = sizew*0.16;
	  fill(220);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.025);
	
	//textFont(loadedFont);
		fill(10);
		textFont(loadedFont);
		textAlign(CENTER, CENTER);
		var multiplier_size = (35 - max(0, inputString.length - 15))/35;
		textSize(sizeh*(0.5 + 0.4*multiplier_size));
	var show_text = inputString;
	if (floor(time * 0.0025) % 2 == 0 && inputString == "")
		show_text += "|"
	text(show_text, centerx, posy);

	//Buttom
	posy = (h*0.82);

	  sizeh = sizew*0.16;
	  fill(20);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.025);
}

function updateScreen()
{
	
	// Update screen size and metrics
	w = windowWidth;
	h = windowHeight;
	centerx = w * 0.5;
	centery = h * 0.5;
}

function keyPressed() {

	//Getting user input
	if (true == true)
	{	
		if (key == "Backspace")
			inputString = inputString.substring(0, inputString.length - 1);
		else
		if (key.length == 1 && inputString.length < 50)
			inputString += key;
	}
}