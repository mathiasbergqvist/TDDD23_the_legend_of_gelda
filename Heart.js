
var health : float = 20.0;
var happyTune : AudioClip;
private var healthBar : GameObject;
healthBar = GameObject.Find("PlayerHealthBar");

function Start () {
	healthBar = GameObject.Find("PlayerHealthBar");
}

function OnTriggerEnter(hit : Collider){
	
	if(hit.gameObject.CompareTag("Player")){
		healthBar.gameObject.SendMessage("AdjustHealth", health);
		Destroy(gameObject);
		audio.PlayOneShot(happyTune);
	}
}