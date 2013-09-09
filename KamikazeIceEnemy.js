class KamikazeIceEnemy extends KamikazeEnemy{

	function OnTriggerEnter(other:Collider){
		if(other.gameObject.CompareTag("Player")){
			
			print("temp");
			var damageInformation = new Array();
			damageInformation[0] = "Ice";
			damageInformation[1] = maxDamage;
			damageInformation[2] = normalDamage;		
			other.gameObject.SendMessage("SetDamage", damageInformation);
			
		}
	}
}

