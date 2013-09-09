class MovingWaterEnemy extends MovingEnemy{

function OnTriggerEnter(other:Collider){
	if(other.gameObject.CompareTag("Player")){
					
		var damageInformation = new Array();
		damageInformation[0] = "Water";
		damageInformation[1] = maxDamage;
		damageInformation[2] = normalDamage;		
		other.gameObject.SendMessage("SetDamage", damageInformation);
		
	}
}


}