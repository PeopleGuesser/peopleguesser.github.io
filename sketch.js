var loadedFont;
var inputString, pressed, counter, pressedkey, textInputSize;
var w, h, centerx, centery;
var button_scale;
var button_opacity;

var PATH = "assets/";

function preload() {

	//Load fonts and images
	loadedFont = loadFont(PATH + "font.ttf");
}

function setup() {

	//Initialize
	inputString = "";
	pressed = false;
	pressedkey = "";
	counter = 0;
	textInputSize = 0.78;
	
	//Buttons fields
	button_scale = 1;
	button_opacity = 1;
	
	//Create Canvas
	updateScreen();
	createCanvas(w, h);
}

function draw() {
	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	// Clear Screen
	updateScreen();
	background(250);
	strokeWeight(0);
	var time = millis();

	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	//Strikes

	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	//Photo
	var sizew, sizeh, posy, posx;
	sizeh = min(w*0.8, h*0.4);
	sizew = sizeh;
	posy = (h*0.4);

	  sizew = w*2;
	  fill(230);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh);
	  sizew = sizeh;
	  fill(20);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.02);

	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	//Input Field
	sizew = min(w*0.8, h*0.6);
	posy = (h*0.692);

	  sizeh = min(w*0.8, h*0.4)*0.16;
	  fill(220);
	rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.02);
	
	//textFont(loadedFont);
		fill(10);
		textFont("Corbel");
		textAlign(CENTER, CENTER);
		textSize( sizeh * textInputSize * 0.9);
		
	var show_text = inputString;
	if (floor(time * 0.0025) % 2 == 0 && inputString == "")
		show_text += "|"
	text( show_text, centerx, posy*1.005);

	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	//Buttom
	posy = (h*0.82);

	var tvalue = ((mouseX > centerx - sizew*0.5*button_scale && mouseX < centerx + sizew*0.5*button_scale &&
	mouseY > posy - sizeh*0.5*button_scale && mouseY < posy + sizeh*0.5*button_scale) ? 1.05 : 1);
	button_scale += (tvalue - button_scale) * deltaTime * 0.02;
	button_opacity = 0.95 + (button_scale - 1)*10;
	
	textSize( sizeh*0.7*button_scale);
	  fill(20, 20, 20, button_opacity*255);
	rect(centerx - sizew*0.5*button_scale, posy - sizeh*0.5*button_scale, sizew*button_scale, sizeh*button_scale, sizew*0.02);
	  fill(230);
	text("Confirm", centerx, posy*1.005);
	
	//Input processor
	keyboardBufferProcess();
}

function updateScreen()
{
	
	// Update screen size and metrics
	w = windowWidth;
	h = windowHeight;
	centerx = w * 0.5;
	centery = h * 0.5;
}

function keyPressed() 
{
	//Pressed
	pressedkey = key;
	pressed = true;
	registerInput(key);
	counter = 0;
}

function keyReleased()
{
	if (key == pressedkey)
	{
		pressed = false;
		pressedkey = "";
		counter = 0;
	}
}

function keyboardBufferProcess()
{
	if (pressed)
	{
		counter += deltaTime;
		
		if (counter > 470)
		{
			counter -= 60;
			registerInput(pressedkey);
		}
	}
}

function registerInput(key)
{
	//Size
	var init_value = 0.78;
	var flex_value = 0.375;
	var start_len = 16;
	var total_len = 40;
	
	//Getting user input
	if (true == true)
	{	
		if (key == "Backspace")
			inputString = inputString.substring(0, inputString.length - 1);
		else
		if (key.length == 1 && inputString.length < 40)
			inputString += key;
	}
	
	//Compute
	textInputSize = ((init_value - flex_value) + flex_value * pow(1 - (max(0, inputString.length - start_len) / (total_len - start_len)), 1.45));

	print( textInputSize);
}