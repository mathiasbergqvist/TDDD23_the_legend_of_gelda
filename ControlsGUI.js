private var buttonWidth:int = 200;
private var buttonHeight:int = 50;
private var spacing:int = 100;
private var buttonSpacing:int = 150;



function OnGUI(){

	if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight + spacing + buttonSpacing, buttonWidth, buttonHeight), "Back to main menu")){
		Application.LoadLevel("GameMenu");
	
	}
}