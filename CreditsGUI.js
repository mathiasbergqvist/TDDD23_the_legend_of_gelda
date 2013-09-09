private var buttonWidth:int = 200;
private var buttonHeight:int = 50;
private var spacing:int = 100;
private var buttonSpacing:int = 60;



function OnGUI(){

	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + spacing + 70, buttonWidth, buttonHeight), "New game")){
		Application.LoadLevel("level1");
	
	}
	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + spacing + buttonSpacing + 70, buttonWidth, buttonHeight), "Main menu")){
		Application.LoadLevel("GameMenu");
	
	}
}