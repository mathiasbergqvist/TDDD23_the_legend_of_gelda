var gamePaused : boolean = false;

private var buttonWidth:int = 200;
private var buttonHeight:int = 50;
private var spacing:int = 100;
private var buttonSpacing:int = 60;

function Start () {

}

function Update(){
	if (Input.GetKeyDown(KeyCode.Escape)){
		/*if(gamePaused){
			Time.timeScale = 1;
			gamePaused = false;
		}*/
		if(!gamePaused){
			Time.timeScale = 0;
			gamePaused = true;
		}
	
	}
	pause = Input.GetButtonDown("Pause");
}

function OnGUI(){
	
	if(gamePaused){
		if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight  , buttonWidth, buttonHeight), "Resume game")){
			Time.timeScale = 1;
			gamePaused = false;
		
		}
		if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight  + buttonSpacing, buttonWidth, buttonHeight), "Main menu")){
			Application.LoadLevel("GameMenu");
			Time.timeScale = 1;
			gamePaused = false;
		
		}
		if(GUI.Button(Rect(Screen.width/2 - buttonWidth/2, Screen.height/2 - buttonHeight  + buttonSpacing*2, buttonWidth, buttonHeight), "Exit")){
			Application.Quit();
		}
	}
}