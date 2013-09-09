
var victory : AudioClip;

function OnTriggerEnter(hit : Collider){
	if(hit.gameObject.CompareTag("Player")){
		Destroy(hit.gameObject);
		EndLevel();
	}
}

function EndLevel(){
	audio.PlayOneShot(victory);
	yield WaitForSeconds(4.0);
	Application.LoadLevel("Completed");
}