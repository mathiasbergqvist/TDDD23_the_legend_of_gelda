#pragma strict

var speed : float;
var damage: float = 10.0;
var maxDamage: float = 30.0;

var boulderDieSound : AudioClip;

private var direction : Vector3;
private var bufferSpace : float = 1.0;

//Aktuellt element hos karaktären
enum BulletElement {
	Fire = 0,
	Ice = 1,
	Water = 2,
	Earth = 3,
}

private var _bulletElement : BulletElement;

//Texturer
private var fireTexture:Texture2D = Resources.Load("lava_texture_2") as Texture2D;
private var iceTexture:Texture2D = Resources.Load("ice_texture") as Texture2D;
private var waterTexture:Texture2D = Resources.Load("water_texture") as Texture2D;
private var earthTexture:Texture2D = Resources.Load("earth_texture") as Texture2D;

function Awake (){

}

//Sätter riktning
function SetDirection(currentDirection:Vector3){
	direction = currentDirection;
}

//Sätter element
function SetElement(element:String){
	switch(element)
	{
	case "Fire":
		transform.renderer.material.mainTexture = fireTexture;
		_bulletElement = BulletElement.Fire;
 		 break;
	case "Ice":
  		transform.renderer.material.mainTexture = iceTexture;
  		_bulletElement = BulletElement.Ice;
 		 break;
 	case "Water":
  		transform.renderer.material.mainTexture = waterTexture;
  		_bulletElement = BulletElement.Water;
 		 break;
 	case "Earth":
  		transform.renderer.material.mainTexture = earthTexture;
  		_bulletElement = BulletElement.Earth;
 		 break;
	}
}

function Update () {

	//Skottets rörelse baserat på spelarens riktning
	if(direction.x != 0.0){
		if(direction.x > 0.0){
			transform.position.x += speed * Time.deltaTime;	
		}
		else{
			transform.position.x -= speed * Time.deltaTime;
		}
		
	}
	else{
		if(direction.z > 0){
			transform.position.z += speed * Time.deltaTime;
		}
		else{
			transform.position.z -= speed * Time.deltaTime;
		}
	}	
}

//Om skottet kolliderar med något...
function OnTriggerEnter(other:Collider){
	
	//Kollar vilket element skottet har för tillfället
	if(_bulletElement == BulletElement.Fire){
		//Om det elementsvaga träffas skall det förstöras, samtidigt som skottet.
		if(other.gameObject.CompareTag("Ice")){	
			other.gameObject.SendMessage("ShowHeart");
			Destroy(other.gameObject);
			Destroy(gameObject);
			audio.PlayOneShot(boulderDieSound);	
		}
		//Om en elementsvag fiende träffas skall denna ta skada
		else if(other.gameObject.CompareTag("EnemyIce")){
			other.gameObject.SendMessage("TakeDamage", damage);
			Destroy(gameObject);
		}
		//Om skottet träffar spelaren (av en skjutande fiende) skall spelaren skadas. 
		else if(other.gameObject.CompareTag("Player")){
			DamagePlayer(other.gameObject);
			Destroy(gameObject);
		}
		//Om vi träffar vanlig terräng förstörs bara skottet
		else if(other.gameObject.CompareTag("Terrain")){
			Destroy(gameObject);
		}
		//Om skotter träffar något otaggat skall ingenting hända
		else if(other.gameObject.CompareTag("Untagged")){}
		//Om skotter träffar något med en annan tag förstörs det bara
		else{
			Destroy(gameObject);
		}
	}
	else if(_bulletElement == BulletElement.Ice){
		if(other.gameObject.CompareTag("Earth")){			
			other.gameObject.SendMessage("ShowHeart");
			Destroy(other.gameObject);
			Destroy(gameObject);
			audio.PlayOneShot(boulderDieSound);
		}
		else if(other.gameObject.CompareTag("EnemyEarth")){
			other.gameObject.SendMessage("TakeDamage", damage);
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Player")){
			DamagePlayer(other.gameObject);
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Terrain")){
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Untagged")){}
		else{
			Destroy(gameObject);
		}
	}
	else if(_bulletElement == BulletElement.Water){
		if(other.gameObject.CompareTag("Fire")){
			other.gameObject.SendMessage("ShowHeart");	
			Destroy(other.gameObject);
			Destroy(gameObject);
			audio.PlayOneShot(boulderDieSound);
		}
		else if(other.gameObject.CompareTag("EnemyFire")){
			other.gameObject.SendMessage("TakeDamage", damage);
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Player")){
			DamagePlayer(other.gameObject);
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Terrain")){
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Untagged")){}
		else{
			Destroy(gameObject);
		}
	}
	else if(_bulletElement == BulletElement.Earth){
		if(other.gameObject.CompareTag("Water")){
			other.gameObject.SendMessage("ShowHeart");
			Destroy(gameObject);
			audio.PlayOneShot(boulderDieSound);
		}
		else if(other.gameObject.CompareTag("EnemyWater")){
			other.gameObject.SendMessage("TakeDamage", damage);
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Player")){
			DamagePlayer(other.gameObject);
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Terrain")){
			Destroy(gameObject);
		}
		else if(other.gameObject.CompareTag("Untagged")){}
		else{
			Destroy(gameObject);
		}
	}
}

function DamagePlayer(player : GameObject){
	var damageInformation = new Array();
	damageInformation[0] = _bulletElement.ToString();
	damageInformation[1] = maxDamage;
	damageInformation[2] = 10.0;
	player.SendMessage("SetDamage", damageInformation);
}