//#region Field
//////////////////////////////////////////////////////////////////////////////////// // 
//////////////////////////////////////////////////////////////////////////////////// // 
//Visual variables
var loadedFont, loadedFrame, loadedPerson, isloadedPerson, loadedBackground, loadedIconC, loadedIconW, loadedStampC, loadedStampW, stamp_it, stamp_progress, pic_scale, last_icon_y;
var picx, picy, picsw, picsh, picstatus;
var inputString, pressed, counter, pressedkey, textInputSize;
var w, h, centerx, centery, screenoffset_y, screenoffset_x, picture_posx;
var button_scale;
var button_opacity;

var SCREEN;

//Variaveis de jogo
var score;
var total_rounds;
var CORRECT_ANSWER;
var person_hint;
var CURRENT_DIFFICULTY;
var clock_to_next_level;

var PATH = "https://peopleguesser.github.io/assets/";//"assets/";
//#endregion

function preload() {

	//Load fonts and images
	loadedFont = loadFont(PATH + "font.otf");
	loadedBackground = loadImage(PATH + "background_light.png");
	loadedFrame = loadImage(PATH + "photoframe.png");

	loadedIconC = loadImage(PATH + "icon_correct.png");
	loadedIconW = loadImage(PATH + "icon_wrong.png");
	loadedStampC = loadImage(PATH + "stamp_correct.png");
	loadedStampW = loadImage(PATH + "stamp_wrong.png");

}

function setup() {

	//Create Canvas
	screenoffset_y = 0;
	screenoffset_x = 0;
	updateScreen();
	createCanvas(w, h);

	//Initialize visual variables
	inputString = "";
	pressed = false;
	pressedkey = "";
	counter = 0;
	textInputSize = 0.78;
	picstatus = 0;
	stamp_it = 0;
	stamp_progress = 0;
	pic_scale = 1;
	last_icon_y = 0;
	isloadedPerson = false;
	
	//Game variables
	SCREEN = 1;

	clock_to_next_level = 0;
	person_hint = "";

	score = [];
	total_rounds = 10;

	CORRECT_ANSWER = "";
	CURRENT_DIFFICULTY = 0;
	
	requestNewPerson(CURRENT_DIFFICULTY);

	//Buttons fields
	picture_posx = picture_posx = w * 1.5;;
	button_scale = 1;
	button_opacity = 1;
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
		image(loadedBackground, 0, (cos(time * 0.0003) - 1) * w * 0.01, max(w, h*1.77777) * 1.01, max(w,h*1.77777) * 0.5625 * 1.01);

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
		var r = gap_w * 0.24;

		if (last_icon_y < 0)
		{
			last_icon_y += 0.00035 * deltaTime;
			if (last_icon_y > 0)
				last_icon_y = 0;
		}

			fill(210);
		for(var i = 0; i < total_rounds; i++)
		{	
			//Position
			posy = (i == score.length - 1) ? (h*(.11 + last_icon_y)) : (h*.11);
			posy += screenoffset_y;

			//Draw base circle
			fill(240);
			circle( i * gap_w + (centerx - sizew * 0.5), posy, r);

			//Draw icons
			if (i < score.length)
			{
				//What to draw
				var icons = r*3;

				if (score[i] == true)
					image(loadedIconC, i * gap_w + (centerx - sizew * 0.5) - icons*.5, posy - icons*.5, icons, icons);
				else 
					image(loadedIconW, i * gap_w + (centerx - sizew * 0.5) - icons*.5, posy - icons*.5, icons, icons);
			}
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
		if (pic_scale > 1)
		{
			pic_scale -= 0.0004*deltaTime;
			if (pic_scale < 1)
				pic_scale = 1;
		}
		
		sizeh = medium_width*1.2*pic_scale;
		sizew = sizeh;

		if (picstatus == 0)
		{
			picture_posx += (centerx - picture_posx) * deltaTime * 0.0042;
		}
		else 
		{
			picture_posx += ((-w) - picture_posx) * deltaTime * 0.0025;
			if (picture_posx < w * -0.9)
			{
				//Scroll Picture
				picture_posx = w * 1.8;
				picstatus = 0;
				stamp_it = 0;

				//Next Person
				requestNewPerson();
			}
		}
		
		if (loadedFrame)
			image(loadedFrame, picture_posx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh);
		if (isloadedPerson == true)
		{
			sizeh *= 0.74;
			sizew = sizeh;
			posy *= 0.929;
			image(loadedPerson, picture_posx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh, picx, picy, picsw, picsh);
		}
		if (stamp_it)
		{
			if (stamp_progress < 1)
			{
				stamp_progress += (0.0045 + (stamp_progress * 0.025))* deltaTime;
				if (stamp_progress > 1)
				{
					stamp_progress = 1;
					pic_scale += .035;
				}
			}
			
			sizeh = medium_width*(2.35 - stamp_progress);
			sizew = sizeh;

			if (stamp_it == 1)
			{
				//Right
				image(loadedStampC, picture_posx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh);
			}
			else
			{
				//Wrong
				image(loadedStampW, picture_posx - sizew*0.5, posy - sizeh*0.5, sizew, sizeh);
			}
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
			stamp_it = (is_the_answer_right == true ? 1: 2);
			stamp_progress = 0;
			last_icon_y = -.035;

			//Reset buffer
			pressed = false;
			pressedkey = "";
			counter = 0;
			inputString = "";

			//Set clock
			clock_to_next_level = 950;

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
	{
		clock_to_next_level -= deltaTime;
		if (clock_to_next_level < 0)
		{
			clock_to_next_level = 0;
			picstatus = 1;
		}
	}
}

function requestNewPerson(dificulty)
{
	//Request new
	CORRECT_ANSWER = "Nobel";

	//Picture
	loadedPerson = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mark_Noble_%2824707626906%29_%28cropped%29.jpg/250px-Mark_Noble_%2824707626906%29_%28cropped%29.jpg", img => {setupPicSize(img)});

	//Hint
	person_hint = "";
}

function setupPicSize(img)
{
	isloadedPerson = true;

	if (img.width == img.height)
	{
		picx = 0;
		picy = 0;
		picsw = img.width;
		picsh = img.height;
	}
	else
	if (img.width > img.height)
	{
		var dif = img.width - img.height;
		picx = dif * 0.5;
		picy = 0;
		picsw = img.height;
		picsh = img.height;
	}
	else
	{
		var dif = img.height - img.width;
		picx = 0;
		picy = dif * 0.5;
		picsw = img.width;
		picsh = img.width;
	}
}
//#endregion

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}