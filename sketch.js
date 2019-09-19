var LeafyFont;
var inputString;
var w, h, centerx, centery;

function preload() {

	//Load fonts and images
	LeafyFont = loadFont("assets/leafy.otf");
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
	
	//textFont(LeafyFont);
		fill(10);
		textFont(LeafyFont);
		textAlign(CENTER, CENTER);
	var show_text = inputString;
	if (floor(time * 0.0025) % 2 == 0 && inputString == "")
		show_text += "|"
	text(show_text, centerx - sizew*0.5, posy - sizeh*0.5);

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
	if ((key >= 'a' && key <= 'z') || (key >= "A" && key <= "Z") || (key >= '0' && key <= '9') || key == " ")
	{	
		if (key == "Backspace")
			inputString = "";
		else
		if (key.length == 1)
			inputString += key;
	}
}