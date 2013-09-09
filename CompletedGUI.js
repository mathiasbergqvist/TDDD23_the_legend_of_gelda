private var buttonWidth:int = 200;
private var buttonHeight:int = 40;
private var spacing:int = 100;
private var buttonSpacing:int = 50;
private var topSpacing:int = 110;


function OnGUI(){

	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + spacing + topSpacing, buttonWidth, buttonHeight), "Replay level")){
		Application.LoadLevel("level1");
	
	}
	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + spacing + buttonSpacing + topSpacing, buttonWidth, buttonHeight), "Main menu")){
		Application.LoadLevel("GameMenu");
	
	}
	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + spacing + buttonSpacing*2 + topSpacing, buttonWidth, buttonHeight), "Credits")){
		Application.LoadLevel("Credits");
	}
}