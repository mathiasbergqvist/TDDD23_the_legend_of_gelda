#pragma strict


var healthBar : GameObject;
healthBar = GameObject.Find("PlayerHealthBar");
var healthMeterLength:int; 
healthMeterLength = healthBar.guiTexture.pixelInset.width;

public var maxHealth:float = 100;
public var currentHealth:float = 100;

private var player : Transform;
private var gameOver : boolean = false;

function Start () {
	player = GameObject.FindWithTag("Player").transform;
}

// Funktion som uppdaterar hälsomätaren grafiskt.
function AdjustHealth(amount:float){
	currentHealth += amount;
	
	if(currentHealth <= 0){
		GameOver();
	}
	if(currentHealth < 1){
		currentHealth = 0;
	}
	if(currentHealth > maxHealth){
		currentHealth = maxHealth;
	}
	healthBar.guiTexture.pixelInset.width = healthMeterLength * (currentHealth/maxHealth);
} 

//Om hälsomätaren har nått botten.
function GameOver(){
	player.gameObject.SendMessage("PlayerDie");
	//Destroy(player.gameObject);
	yield WaitForSeconds(1.0);
	gameOver = true;
}

//GUI-meny för game over.
function OnGUI()
{
	var buttonPadding : int = 30;
	
	if(gameOver)
	{	
		if(GUI.Button(Rect(Screen.width/2-100, Screen.height/2-100, 200, 100), "Retry level?"))
		{
			Application.LoadLevel("level1");
		}
		if(GUI.Button(Rect(Screen.width/2-100, Screen.height/2+buttonPadding, 200, 100), "Main menu"))
		{
			Application.LoadLevel("GameMenu");
		}
	}
}