//#region Field
//////////////////////////////////////////////////////////////////////////////////// // 
//////////////////////////////////////////////////////////////////////////////////// // 
//Visual variables
var loadedFont, loadedFrame, loadedBackground, picx, picy, picsw, picsh;
var inputString, pressed, counter, pressedkey, textInputSize;
var w, h, centerx, centery, screenoffset_y, screenoffset_x;
var button_scale;
var button_opacity;

var SCREEN;

//Variaveis de jogo
var score;
var total_rounds;
var CORRECT_ANSWER;
var person_hint;
var person_picture;
var CURRENT_DIFFICULTY;
var clock_to_next_level;

var PATH = "https://peopleguesser.github.io/assets/";//"assets/";
//#endregion

function preload() {

	//Load fonts and images
	loadedFont = loadFont(PATH + "font.otf");
	loadedBackground = loadImage(PATH + "background.png");
	loadedFrame = loadImage(PATH + "photoframe.png");
}

function setup() {

	//Initialize visual variables
	inputString = "";
	pressed = false;
	pressedkey = "";
	counter = 0;
	textInputSize = 0.78;
	
	//Game variables
	SCREEN = 1;

	clock_to_next_level = 0;
	person_picture = -1;
	person_hint = "";

	score = [];
	total_rounds = 10;

	CORRECT_ANSWER = "";
	CURRENT_DIFFICULTY = 0;
	
	requestNewPerson(CURRENT_DIFFICULTY);
	
	//Buttons fields
	posx = 0;
	button_scale = 1;
	button_opacity = 1;
	
	//Create Canvas
	screenoffset_y = 0;
	screenoffset_x = 0;
	updateScreen();
	createCanvas(w, h);
}

function draw() {
	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	// Clear Screen
	updateScreen();

	strokeWeight(0);
	var time = millis();
	var sizew, sizeh, posy, posx;

	var larger_width = min(w*0.8, h*0.6);
	var medium_width = min(w*0.8, h*0.4);

	if (loadedFrame)
		image(loadedBackground, 0, (cos(time * 0.0002) - 1) * w * 0.01, max(w, h*1.77777) * 1.01, max(w,h*1.77777) * 0.5625 * 1.01);

	//////////////////////////////////////////////////////////////////////////////////// // 
	//////////////////////////////////////////////////////////////////////////////////// // 
	//TELA DE TITULO DO JOGO
	if (SCREEN == 0)
	{

	}
	else
	//PRIMEIRA TELA DO JOGO
	if (SCREEN == 1)
	{
		//////////////////////////////////////////////////////////////////////////////////// // 
		//////////////////////////////////////////////////////////////////////////////////// // 
		//Strikes
		sizew = larger_width

		var gap_w = (sizew/(total_rounds - 1));
		var r = gap_w * 0.2;
		posy = (h*.11) + screenoffset_y;

			fill(210);
		for(var i = 0; i < total_rounds; i++)
		{	
			//What to draw
			if (i >= score.length)
				fill(210);
			else
			if (score[i] == true)
				fill(66, 245, 102);
			else 
				fill(245, 61, 70);

			//Draw
			circle( i * gap_w + (centerx - sizew * 0.5), posy, r);
		}

		//////////////////////////////////////////////////////////////////////////////////// // 
		//////////////////////////////////////////////////////////////////////////////////// // 
		//Faixa
			sizeh = medium_width;
			posy = (h*0.4) + screenoffset_y;
			sizew = w*2;
			fill(20, 20, 20, 255 * (cos(time * 0.0005) * 0.05 + 0.95));
		rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh);

		//Picture
		sizeh = medium_width*1.2;
		sizew = sizeh;
		posx = centerx;
		
		if (loadedFrame)
			image(loadedFrame, posx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh);
		if (person_picture)
		{
			sizeh *= 0.74;
			sizew = sizeh;
			posy *= 0.929;
			image(person_picture, posx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, picx, picy, picsw, picsh);
		}

		//////////////////////////////////////////////////////////////////////////////////// // 
		//////////////////////////////////////////////////////////////////////////////////// // 
		//Input Field
		sizew = larger_width;
		posy = (h*0.6925) + screenoffset_y;

		sizeh = medium_width*0.16;
		fill(220);
		rect(centerx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, sizew*0.02);
		
		//textFont(loadedFont);
			fill(10);
			textFont(loadedFont);
			textAlign(CENTER, CENTER);
			textSize( sizeh * textInputSize * 0.93);
			
		var show_text = inputString;
		if (floor(time * 0.0025) % 2 == 0 && inputString == "")
			show_text += "|"
		text( show_text, centerx, posy*0.995);

		//////////////////////////////////////////////////////////////////////////////////// // 
		//////////////////////////////////////////////////////////////////////////////////// // 
		//Buttom
		posy = (h*0.8) + screenoffset_y;

		var tvalue = ((mouseX > centerx - sizew*0.5*button_scale && mouseX < centerx + sizew*0.5*button_scale &&
		mouseY > posy - sizeh*0.5*button_scale && mouseY < posy + sizeh*0.5*button_scale) ? 1.05 : 1);
		button_scale += (tvalue - button_scale) * deltaTime * 0.02;
		button_opacity = 0.95 + (button_scale - 1)*10;
		
		textSize( sizeh*0.75*button_scale);
		fill(20, 20, 20, button_opacity*255);
		rect(centerx - sizew*0.5*button_scale, posy - sizeh*0.5*button_scale, sizew*button_scale, sizeh*button_scale, sizew*0.02);
		fill(230);
		text("Confirm", centerx, posy*0.995);

		//////////////////////////////////////////////////////////////////////////////////// // 
		//////////////////////////////////////////////////////////////////////////////////// // 
		//Input processor
		keyboardBufferProcess();

		//Clock procesor
		clockTick();
	}
	else
	//TELE DE ENDGAME DO JOGO
	if (SCREEN == 2)
	{

	}
}

//#region Keyboard processing and reading
function mouseClicked() {
	if (button_opacity > 0.96 && clock_to_next_level == 0)
	{
		validateAnswerComplete();
	}
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
	if (clock_to_next_level == 0)
	{
		pressedkey = key;
		pressed = true;
		registerInput(key);
		counter = 0;
	}
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
	var flex_value = 0.275;
	var start_len = 16;
	var total_len = 35;
	
	//Getting user input
	if (true == true)
	{	
		if (key == "Backspace")
			inputString = inputString.substring(0, inputString.length - 1);
		else
		if (key == "Enter")
			validateAnswerComplete();
		else
		if (key.length == 1 && inputString.length < 35)
			inputString += key;
	}
	
	//Compute
	textInputSize = ((init_value - flex_value) + flex_value * pow(1 - (max(0, inputString.length - start_len) / (total_len - start_len)), 1.45));
}
//#endregion

//#region Game Mechanics
function validateAnswer(guess)
{
	//Preparar a informacao
	list_of_names = CORRECT_ANSWER.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
	list_of_guess = guess.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
	
	//Validar por iteracao
	var total_names_right = 0;

	for(var i = 0; i < list_of_names.length; i++)
	{
		for(var j = 0; j < list_of_names.length; j++)
		{
			if (list_of_names[i] == list_of_guess[j])
			{
				total_names_right++;
				continue;
			}
		}
	}

	//Wrong
	return (total_names_right == list_of_guess.length);
}

function validateAnswerComplete()
{
	//Make sure the new round has started
	if (clock_to_next_level == 0)
	{
		if (inputString.length > 0)
		{
			//Visual Effct
			button_scale += .1;

			//Validate and save result
			is_the_answer_right = validateAnswer(inputString);
			print( is_the_answer_right);

			//Reset buffer
			pressed = false;
			pressedkey = "";
			counter = 0;
			inputString = "";

			//Set clock
			clock_to_next_level = 600;

			//Record historic
			score.push(is_the_answer_right);
		}
		else
		{
			//Nope
		}
	}
}

function clockTick()
{
	if (clock_to_next_level > 0)
		clock_to_next_level -= deltaTime;
	if (clock_to_next_level < 0)
		clock_to_next_level = 0;
}

function requestNewPerson(dificulty)
{
	//Request new
	CORRECT_ANSWER = "Pedro Álvares Cabral";

	//Picture
	person_picture = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pedro_Alvares_Cabral.jpg/200px-Pedro_Alvares_Cabral.jpg", setupPicSize());

	//Hint
	person_hint = "";
}

function setupPicSize()
{
	if (person_picture.width == person_picture.height)
	{
		picx = 0;
		picy = 0;
		picsw = person_picture.width;
		picsh = person_picture.height;
	}
	else
	if (person_picture.width > person_picture.height)
	{
		var dif = person_picture.width - person_picture.height;
		picx = dif * 0.5;
		picy = 0;
		picsw = person_picture.height;
		picsh = person_picture.height;
	}
	else
	{
		var dif = person_picture.height - person_picture.width;
		picx = 0;
		picy = dif * 0.5;
		picsw = person_picture.width;
		picsh = person_picture.width;
	}
}
//#endregion

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}