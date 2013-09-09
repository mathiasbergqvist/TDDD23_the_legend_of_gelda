//Underklass till Enemy
class KamikazeEnemy extends Enemy{
	

	var rotationSpeed = 3; 
	var chaseThreshold = 5;
	var giveUpThreshold = 1; 
	var attackRepeatTime = 1; 
	
	//Flagga som kollar om fienden jagar spelaren eller inte.
	private var chasing = false;
	
	function Update () { 
	
		//Avstånd till spelaren
		var dist= (target.position - enemyTransform.position).magnitude; 
		
		if (chasing) { 
			
			if (dist > giveUpThreshold) {
				chasing = false; 
			} 
			if(dist <= chaseThreshold){
				//Rotera fienden mot spelaren 
				enemyTransform.rotation = Quaternion.Slerp(enemyTransform.rotation, Quaternion.LookRotation(target.position - enemyTransform.position), rotationSpeed*Time.deltaTime); 
				//Rör sig mot spelaren 
				enemyTransform.position += enemyTransform.forward * speed * Time.deltaTime; 
			} 
		} 
		else { 
			//Börjar följa efter spelaren om denne är tillräckligt nära.
			if (dist <= chaseThreshold) {
				chasing = true; 
			} 
		}
	}
}

