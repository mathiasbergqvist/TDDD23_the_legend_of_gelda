	
var enemyTransform : Transform; 
var prefabExplosion:Transform;
var target : Transform;
var health : float = 30.0;
var normalDamage : float = 10.0;
var maxDamage : float = 30.0;
var speed : float = 5.0;
var originalX:float;
var originalZ:float;

	
function Start () {
	
	target = GameObject.FindWithTag("Player").transform;
}
	
function Awake(){
		
	enemyTransform = transform;	
	originalX = transform.position.x;
	originalZ = transform.position.z;
}

function TakeDamage (damage:float){
	health -= damage;
	if(health <= 0.0){
		Instantiate(prefabExplosion, transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}



