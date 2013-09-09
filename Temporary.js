#pragma strict

//Hur länge skottet finns kvar.
var life : float = 1.0;

//Kallas 1 ggr/sek av Unity
function Update () {
	life -= Time.deltaTime;
	
	//Skottet försvinner då livstiden är slut. 
	if(life <= 0.0){
		Destroy(gameObject);
	}
}