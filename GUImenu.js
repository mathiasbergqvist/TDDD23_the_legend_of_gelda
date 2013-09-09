

private var buttonWidth:int = 200;
private var buttonHeight:int = 40;
private var spacing:int = 100;
private var buttonSpacing:int = 50;
private var topSpacing:int = 50;



function OnGUI(){

	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + topSpacing +spacing, buttonWidth, buttonHeight), "New Game")){
		Application.LoadLevel("level1");
	
	}
	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + topSpacing + spacing + buttonSpacing, buttonWidth, buttonHeight), "Controls")){
		Application.LoadLevel("controls");
	
	}
	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + topSpacing+ spacing + buttonSpacing*2, buttonWidth, buttonHeight), "Credits")){
		Application.LoadLevel("Credits");
	}
	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + topSpacing+ spacing + buttonSpacing*3, buttonWidth, buttonHeight), "Exit")){
		Application.Quit();
	}
}