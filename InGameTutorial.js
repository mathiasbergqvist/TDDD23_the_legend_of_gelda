
private var player : Transform; 
private var showWalkTutorial = false;
private var showElementTutorial = false;
private var showShootTutorial = false;

var walkTutorialText : String = "Use the arrow keys to move character.";
var elementTutorialText : String = "Use the number keys 1-4 to switch the character's current element.";
var shootTutorialText : String = "Use the space bar to fire a shot.";

function Start () {
	player = GameObject.FindWithTag("Player").transform;
}

function Update () {

	//Väljer informationstext baserat på spelarens position.
	if(player.position.z <= 8.0){
		showWalkTutorial = true;
	}
	else{
		showWalkTutorial = false;
	}
	
	if(player.position.z > 8.0 && player.position.z <= 15.0){
		showElementTutorial = true;
	}
	else{
		showElementTutorial = false;
	}
	
	if(player.position.z > 15.0 && player.position.z <= 24.0){
		showShootTutorial = true;
	}
	else{
		showShootTutorial = false;
	}
}

function OnGUI(){
	
	//Ritar ut motsvarande informationstext.
	if(showWalkTutorial){
		walkTutorialText = GUI.TextArea (Rect (45, 160, 200, 100), walkTutorialText, 200);
	}
	else if(showElementTutorial){
		elementTutorialText = GUI.TextArea (Rect (45, 160, 200, 100), elementTutorialText, 200);
	}
	else if(showShootTutorial){
		shootTutorialText = GUI.TextArea (Rect (45, 160, 200, 100), shootTutorialText, 200);
	}
}