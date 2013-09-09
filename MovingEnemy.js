#pragma strict

//Underklass till Enemy
class MovingEnemy extends Enemy{
	
	private var range:float = 3.0;
	
	//Rörelsen hos fienden blir en svängning hos en sinuskurva.
	private var wave:float = Random.Range(0, Mathf.PI*2*10)*0.05;
	var waveMagnitude:float = 1.0;
	var waveSpeed:float = 1.0;
	
	//Flaggor som håller reda på om fienden rör sig i z-led eller x-led
	var movingVertical : boolean = false;
	var movingHoizontal : boolean = true;
	
	//Upadate 1 ggr/sek
	function Update () {
		if(movingVertical){
			enemyTransform.position.z = originalZ + Mathf.Sin(wave) * waveMagnitude;
			wave += Time.deltaTime * waveSpeed;
		}
		else if(movingHoizontal){
			enemyTransform.position.x = originalX + Mathf.Sin(wave) * waveMagnitude;
			// increase our wave counter object by "waveSpeed"
			wave += Time.deltaTime * waveSpeed;
		}
	}
}