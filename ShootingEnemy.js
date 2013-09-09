	
	
	var enemyTransform : Transform; 
	var target : Transform;
	var health : float = 30.0;
	var normalDamage : float = 10.0;
	var maxDamage : float = 30.0;
	var prefabExplosion:Transform;
	
	//Referens till prefaben för skott. 
	var prefabShot : Transform;
	
	
	var attackRepeatTime : float = 0.4;
	var rotationSpeed = 3;  
	var attackThreshold = 5;
	private var direction : Vector3;
	//Flagga som kollar om fienden attackerar spelaren eller inte.
	private var attacking = false;
	private var attackTime;
	
	
	enum Direction {
		Up = 0,
		Down = 1,
		Left = 2,
		Right = 3,
	}
	
	var _enemyDirection : Direction;
	

	function Start () {
		target = GameObject.FindWithTag("Player").transform;
	}
		
	function Awake(){
		attackTime = Time.time;
		enemyTransform = transform;	
		UpdateRotation();
	}
	
	function TakeDamage (damage:float){
		health -= damage;
		if(health <= 0.0){
			Instantiate(prefabExplosion, transform.position, Quaternion.identity);
			Destroy(gameObject);
		}
	}
	
	//Sätter orientering hos fienden.
	function UpdateRotation(){
		if(_enemyDirection == Direction.Down){
			enemyTransform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation (Vector3(0, 0, -1.0)), Time.deltaTime*100);
			direction = Vector3(0, 0, -1.0);
		}
		else if(_enemyDirection == Direction.Up){
			enemyTransform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation (Vector3(0, 0, 1.0)), Time.deltaTime*100);
			direction = Vector3(0, 0, 1.0);
		}
		else if(_enemyDirection == Direction.Left){
			enemyTransform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation (Vector3(-1.0, 0, 0)), Time.deltaTime*100);
			direction = Vector3(-1.0, 0, 0);
		}
		else if(_enemyDirection == Direction.Right){
			enemyTransform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation (Vector3(1.0, 0, 0)), Time.deltaTime*100);
			direction = Vector3(1.0, 0, 0);
		}
	}
	
	function Update () { 
		
		//Avstånd till spelaren
		var dist= (target.position - enemyTransform.position).magnitude; 
		
		if (attacking) { 
		
			if (dist > attackThreshold) {
				attacking = false; 				
			} 
			//Attackerar med tidsintervallet attackTime då spelaren är tillräckligt nära. 		
			if(dist <= attackThreshold && Time.time > attackTime){
				//enemyTransform.rotation = Quaternion.Slerp(enemyTransform.rotation, Quaternion.LookRotation(target.position - enemyTransform.position), rotationSpeed*Time.deltaTime); 
				Attack(); 
				attackTime = Time.time + attackRepeatTime; 
			}
		} 
		else {
			if (dist <= attackThreshold) {
				attacking = true; 				
			} 
		}
	}
	
	function Attack(){
		//Skapar ett skott utifrån samma position och rotation som karaktären
		var positionBuffered : Vector3 = GetBufferedVector(); 
		
		var shot :Transform = Instantiate(prefabShot, positionBuffered, enemyTransform.rotation);
		
		//Sänder infomration om riktning och element till skottet
		if(enemyTransform.gameObject.CompareTag("EnemyFire")){
			shot.gameObject.SendMessage("SetDirection", direction);
			shot.gameObject.SendMessage("SetElement", "Fire");
		}
		else if(enemyTransform.gameObject.CompareTag("EnemyIce")){
			shot.gameObject.SendMessage("SetDirection", direction);
			shot.gameObject.SendMessage("SetElement", "Ice");
		}
		else if(enemyTransform.gameObject.CompareTag("EnemyWater")){
			shot.gameObject.SendMessage("SetDirection", direction);
			shot.gameObject.SendMessage("SetElement", "Water");
		}
		else if(enemyTransform.gameObject.CompareTag("EnemyEarth")){
			shot.gameObject.SendMessage("SetDirection", direction);
			shot.gameObject.SendMessage("SetElement", "Earth");
		}	
		 
	}
	
	//Lägger på bufferdistans så att inte skottet skall krocka med fienden själv.
	function GetBufferedVector(){
		var buffer : float = 0.8;
		
		if(_enemyDirection == Direction.Up){
			return Vector3(enemyTransform.position.x, enemyTransform.position.y, enemyTransform.position.z + buffer);
		}
		else if(_enemyDirection == Direction.Down){
			return Vector3(enemyTransform.position.x, enemyTransform.position.y, enemyTransform.position.z - buffer);
		}
		else if(_enemyDirection == Direction.Left){
			return Vector3(enemyTransform.position.x - buffer, enemyTransform.position.y, enemyTransform.position.z);
		}
		else if(_enemyDirection == Direction.Right){
			return Vector3(enemyTransform.position.x + buffer, enemyTransform.position.y, enemyTransform.position.z);
		}
	}
	
	//Kollisionshanterare
	function OnTriggerEnter(other:Collider){
	
	if(other.gameObject.CompareTag("Player")){
		
		var damageInformation = new Array();	
		
		if(enemyTransform.gameObject.CompareTag("EnemyFire")){
			damageInformation[0] = "Fire";
		}	
		else if(enemyTransform.gameObject.CompareTag("EnemyIce")){
			damageInformation[0] = "Ice";
		}
		else if(enemyTransform.gameObject.CompareTag("EnemyWater")){
			damageInformation[0] = "Water";
		}
		else if(enemyTransform.gameObject.CompareTag("EnemyEarth")){
			damageInformation[0] = "Water";
		}		

		damageInformation[1] = maxDamage;
		damageInformation[2] = normalDamage;		
		other.gameObject.SendMessage("SetDamage", damageInformation);
	}
}
	