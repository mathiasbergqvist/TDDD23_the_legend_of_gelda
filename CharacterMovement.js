
// Kräver att en character controller ska vara tilldelad till samma spelobjekt som scriptet tilldelas.
@script RequireComponent(CharacterController)

//Animationer
public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var shootAnimation : AnimationClip;
public var hurtAnimation : AnimationClip;
public var dieAnimation : AnimationClip;

//Hastighet hos animationerna
public var walkMaxAnimationSpeed : float = 0.75;
public var shootMaxAnimationSpeed : float = 1.0;
public var hurtMaxAnimationSpeed : float = 1.0;
public var dieMaxAnimationSpeed : float = 0.75;

//Prefab för explosion
var prefabExplosion:Transform;

//Variabel som håller kolla på aktuell animation.
private var _animation : Animation;

//Ljud
var shotSound : AudioClip;
var hurtSound : AudioClip;
var gameOverSound : AudioClip;

//Aktuellt tillstånd hos karaktären
enum CharacterState {
	Idle = 0,
	Walking = 1,
	Shooting = 2,
}

private var _characterState : CharacterState;

//Aktuellt element hos karaktären
enum CharacterElement {
	Fire = 0,
	Ice = 1,
	Water = 2,
	Earth = 3,
}

private var _characterElement : CharacterElement;


//Hälsomätaren till karaktären
private var healthBar : GameObject;
healthBar = GameObject.Find("PlayerHealthBar");

//Ikonen som visar aktuellt element
private var icon : GameObject;
icon = GameObject.Find("Icon");

//Referens till prefaben för skott. 
var prefabShot : Transform;

//Flagga som håller koll på om vi blir skadade just nu.
private var takingDamage : boolean = false;

// Gånghastighet
var walkSpeed = 2.0;

// Hur snabbt karaktären kan byta hastighet
var speedSmoothing = 10.0;

// Hur snabbt karaktären roterar då man byter riktning.
var rotationSmoothing = 10.0;

//Kamerans distans till spelaren
var cameraDistance:int = 10;

// Den tifälliga riktningen i planen x-z
private var moveDirection = Vector3.zero;

//Akuell hastighet.
private var targetSpeed = 0.0;

// Hastigheten i x-z
private var moveSpeed : float = 0.0;

private var drawbackMovementVelocity:float = 50.0; 

// Den senaste kollisionsflaggan som blev returnerad från controller.Move
private var collisionFlags : CollisionFlags; 

//Flagga för att hålla koll på om vi rör oss.
private var isMoving = false;

//Flagga som håller koll på om vi skjuter.
private var isShooting = false;

// Flagga som håller koll på om någon av de vertikala piltangenterna är nedtryckta.
private var isMovingVertical = false;

// Flagga som håller koll på om någon av de horisontella piltangenterna är nedtryckta.
private var isMovingHorizontal = false;

// Flagga som håller koll på om karaktären är kontrollerbar.
private var isControllable = true;

//Awake anropas när programmet startar.
function Awake ()
{
	moveDirection = transform.TransformDirection(Vector3.forward); //Startpunkt	
	_animation = GetComponent(Animation); //Laddar standardanimation (idle)
	_characterElement = CharacterElement.Fire; //Anger fire som startelement
			
}

//Uppatering av animations, - och rörelsekomponenter före varje updatering körs.
function UpdateParameters ()
{
	
	//Input från mellanslag.
	var isShooting = Input.GetButtonDown("Shoot");

	//Input från piltangenter
	var v = Input.GetAxisRaw("Vertical");
	var h = Input.GetAxisRaw("Horizontal");
	
	//Input från siffertangeter
	var pressingOne = Input.GetButtonDown("FireElement");
	var pressingTwo = Input.GetButtonDown("IceElement");
	var pressingThree = Input.GetButtonDown("WaterElement");
	var pressingFour = Input.GetButtonDown("EarthElement");
	
	//Har någon av piltangenterna blivit nedtryckta?
	var wasMoving = isMoving;
	isMovingVertical = Mathf.Abs (v) > 0.1;
	isMovingHorizontal = Mathf.Abs (h) > 0.1;
	
	//Avfyras ett skott?
	if(isShooting){
		_characterState = CharacterState.Shooting;
		targetSpeed = 0.0;
	}
	//Kollar om spelaren har bytt element.
	else if(pressingOne){
		_characterElement = CharacterElement.Fire;
	}
	else if(pressingTwo){
		_characterElement = CharacterElement.Ice;
	}
	else if(pressingThree){
		_characterElement = CharacterElement.Water;
	}
	else if(pressingFour){
		_characterElement = CharacterElement.Earth;
	}
	//Tilldelar riktning, tillstånd och hastighet baserat på input.
	else if(isMovingVertical){
		moveDirection = Vector3 (0, 0, v);
		_characterState = CharacterState.Walking;
		targetSpeed = Mathf.Min(moveDirection.magnitude, 1.0)*walkSpeed;
		isMoving = true;
	}
	else if(isMovingVertical && isMovingHorizontal){
		moveDirection = Vector3 (0, 0, v);
		_characterState = CharacterState.Walking;
		targetSpeed = Mathf.Min(moveDirection.magnitude, 1.0)*walkSpeed;
		isMoving = true;
	}
	else if(isMovingHorizontal){
		moveDirection = Vector3 (h, 0, 0);
		_characterState = CharacterState.Walking;
		targetSpeed = Mathf.Min(moveDirection.magnitude, 1.0)*walkSpeed;
	}
	else{
		_characterState = CharacterState.Idle;
		targetSpeed = 0.0;
	}
		
	// Jämnar till hastigheten baserat på aktuell riktning.
	var curSmooth = speedSmoothing * Time.deltaTime;
	
	//Beräknar hastighet
	moveSpeed = Mathf.Lerp(moveSpeed, targetSpeed, curSmooth);
		
}

function Update() {

	////Texturer som används för att markera att karaktären bytt element.
	var fireTexture:Texture2D = Resources.Load("lava_texture_2") as Texture2D;
	var iceTexture:Texture2D = Resources.Load("ice_texture") as Texture2D;
	var waterTexture:Texture2D = Resources.Load("water_texture") as Texture2D;
	var earthTexture:Texture2D = Resources.Load("earth_texture") as Texture2D;
	var redTexture:Texture2D = Resources.Load("red") as Texture2D;
	var whiteTexture:Texture2D = Resources.Load("white") as Texture2D;
	var blueTexture:Texture2D = Resources.Load("blue") as Texture2D;
	var brownTexture:Texture2D = Resources.Load("brown") as Texture2D;
	var fireIconTexture:Texture2D = Resources.Load("icon_flame") as Texture2D;
	var iceIconTexture:Texture2D = Resources.Load("icon_snowflake") as Texture2D;
	var waterIconTexture:Texture2D = Resources.Load("icon_waterdrop") as Texture2D;
	var earthIconTexture:Texture2D = Resources.Load("icon_earth") as Texture2D;
	
	
	if (!isControllable)
	{
		// Nollställer alla inputs om karaktären inte är kontrollerbar.
		Input.ResetInputAxes();
	}

	UpdateParameters();
	
	// Beräknar den faktiska hastigheten.
	var movement = moveDirection * moveSpeed;
	
	//Flyttar spelaren
	MoveCharacter(movement);
	
	
	//Tilldelar textur
	if(takingDamage){
		SetBodyTexture(redTexture, redTexture);
	}
	else{
		if(_characterElement == CharacterElement.Fire){			
			SetBodyTexture(fireTexture, redTexture);
			SetIconImage(fireIconTexture);
		}
		else if(_characterElement == CharacterElement.Ice){
			SetBodyTexture(iceTexture, whiteTexture);
			SetIconImage(iceIconTexture);
		}
		else if(_characterElement == CharacterElement.Water){
			SetBodyTexture(waterTexture, blueTexture);
			SetIconImage(waterIconTexture);
		}
		else if(_characterElement == CharacterElement.Earth){
			SetBodyTexture(earthTexture, brownTexture);
			SetIconImage(earthIconTexture);
		}
	}
	
	//Väljer animation
	var controller : CharacterController = GetComponent(CharacterController); //Karaktären
	if(!takingDamage){	
		if(_animation){		
				if(_characterState == CharacterState.Walking) {
					_animation[walkAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, walkMaxAnimationSpeed); //Sätter animationshastighastighet.
					_animation.CrossFade(walkAnimation.name); //Spelar upp animation
				}
				else if(_characterState == CharacterState.Idle){
					_animation.CrossFade(idleAnimation.name);
				}
				else if(_characterState == CharacterState.Shooting){
					_animation[shootAnimation.name].speed = Mathf.Clamp(controller.velocity.magnitude, 0.0, shootMaxAnimationSpeed);
					_animation.Play(shootAnimation.name);
					Shoot();
				}		
		}
	}

		
	// Ser till så att inte karaktären flyttar på sig i y-led.
	transform.position.y = 0.0;
	
	// Sätter rotationen.
	if (moveDirection.sqrMagnitude > 0.01){
		transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation (moveDirection), Time.deltaTime*rotationSmoothing);
	}
	
}

//Funktionen kallas då vi kolliderar med något objekt.
function OnControllerColliderHit (hit : ControllerColliderHit )
{
	var collisionDamage : int = 10;
	
	// Kollar vad som vi kolliderar med genom att jämföra taggar.
	if(_characterElement == CharacterElement.Fire){
		if(hit.gameObject.CompareTag("Water"))
		{
			//Tar skada
			TakeDamage(collisionDamage);
			takingDamage = true;
		}
		else{
			takingDamage = false;
		}
	}
	else if(_characterElement == CharacterElement.Ice){
		if(hit.gameObject.CompareTag("Fire"))
		{
			TakeDamage(collisionDamage);
			takingDamage = true;
		}
		else{
			takingDamage = false;
		}
	}
	else if(_characterElement == CharacterElement.Water){
		if(hit.gameObject.CompareTag("Earth"))
		{
			TakeDamage(collisionDamage);
			takingDamage = true;
		}
		else{
			takingDamage = false;
		}
	}
	else if(_characterElement == CharacterElement.Earth){
		if(hit.gameObject.CompareTag("Ice"))
		{
				TakeDamage(collisionDamage);
				takingDamage = true;	
			
		}
		else{
			takingDamage = false;
		}
	}
}

//Funktion som får karaktären att ta skada
function TakeDamage(damage){
	
	if(!takingDamage){
		
		//Spela upp ljudfilen
		audio.PlayOneShot(hurtSound);
		
		//Spelar upp hurt-animationen
		_animation.Play(hurtAnimation.name);
		
		targetSpeed = 0.0;
		//Uppdatear hälsomätaren genom att skicka ett medelande
		healthBar.gameObject.SendMessage("AdjustHealth", -damage);
		
		var redTexture:Texture2D = Resources.Load("red") as Texture2D;
		SetBodyTexture(redTexture, redTexture);
		
		//Karaktären kastas bakåt då han tar skada
		var drawbackMovement = -moveDirection * drawbackMovementVelocity;
		MoveCharacter(drawbackMovement);
	
	}
}

//Sätter mottagen skada
function SetDamage(damageInformation){
	switch(damageInformation[0])
	{
	case "Fire":
		if(GetCharacterElement() == "Ice"){
			TakeDamage(damageInformation[1]);
		}
		else{
			print("other");
			TakeDamage(damageInformation[2]);
		}
		break;
	case "Ice":
  		if(GetCharacterElement() == "Earth"){
			TakeDamage(damageInformation[1]);
		}
		else{
			TakeDamage(damageInformation[2]);
		}
 		 break;
 	case "Water":
  		if(GetCharacterElement() == "Fire"){
			TakeDamage(damageInformation[1]);
		}
		else{
			TakeDamage(damageInformation[2]);
		}
 		 break;
 	case "Earth":
  		if(GetCharacterElement() == "Water"){
			TakeDamage(damageInformation[1]);
		}
		else{
			TakeDamage(damageInformation[2]);
		}
 		 break;
	}
}

function MoveCharacter(movement){
	
	// Vi vill att hastgheten skall vara oberoende av frameraten.
	movement *= Time.deltaTime;
	
	// Utför själva förflyttningen.
	var controller : CharacterController = GetComponent(CharacterController); //Karaktären
	collisionFlags = controller.Move(movement);
	
	//Ser till så att kameran följer efter spelaren.
	GameObject.Find("Camera").transform.position = new Vector3(controller.transform.position.x, controller.transform.position.y + cameraDistance, controller.transform.position.z);
}

function Shoot(){
	
	//Spela upp ljudfilen
	audio.PlayOneShot(shotSound);
	
	var positionBuffered : Vector3 = GetBufferedVector(); 
	
	//Skapar ett skott utifrån samma position och rotation som karaktären
	var shot :Transform = Instantiate(prefabShot, positionBuffered, transform.rotation);
	
	//Sänder infomration om riktning och element till skottet
	shot.gameObject.SendMessage("SetDirection", GetDirection());
	shot.gameObject.SendMessage("SetElement", GetCharacterElement());
}

function PlayerDie(){
	//_animation.Play(dieAnimation.name);
	Instantiate(prefabExplosion, transform.position, Quaternion.identity);
	Destroy(gameObject);
	audio.PlayOneShot(gameOverSound);
}

//Sätter textur hos karaktären
function SetBodyTexture(bodyTexture:Texture2D, bodyPartTexture:Texture2D){

	var character_body = GameObject.Find("Player/body");
	var character_arm_right = GameObject.Find("Player/arm_right/upper_arm_right");
	var character_hand_right = GameObject.Find("Player/arm_right/hand_right");
	var character_thumb_right = GameObject.Find("Player/arm_right/thumb_right");
	var character_leg_right = GameObject.Find("Player/leg_right/upper_leg_right");
	var character_foot_right = GameObject.Find("Player/leg_right/foot_right");
	var character_arm_left = GameObject.Find("Player/arm_left/upper_arm_right01");
	var character_hand_left = GameObject.Find("Player/arm_left/hand_right01");
	var character_thumb_left = GameObject.Find("Player/arm_left/thumb_right01");
	var character_leg_left = GameObject.Find("Player/leg_left/upper_leg_right01");
	var character_foot_left = GameObject.Find("Player/leg_left/foot_right01");
	
	character_body.renderer.material.mainTexture = bodyTexture;
	character_arm_right.renderer.material.mainTexture = bodyPartTexture;
	character_hand_right.renderer.material.mainTexture = bodyPartTexture;
	character_thumb_right.renderer.material.mainTexture = bodyPartTexture;
	character_leg_right.renderer.material.mainTexture = bodyPartTexture;
	character_foot_right.renderer.material.mainTexture = bodyPartTexture;
	character_arm_left.renderer.material.mainTexture = bodyPartTexture;
	character_hand_left.renderer.material.mainTexture = bodyPartTexture;
	character_thumb_left.renderer.material.mainTexture = bodyPartTexture;
	character_leg_left.renderer.material.mainTexture = bodyPartTexture;
	character_foot_left.renderer.material.mainTexture = bodyPartTexture;
}

//Sätter bild på ikonen.
function SetIconImage(image:Texture2D){
	icon.guiTexture.texture = image;
}

//Lägger på bufferdistans så att inte skottet skall krocka med spelaren själv.
function GetBufferedVector(){
	
	var buffer : float = 0.8;
		
	if(moveDirection.z > 0.0){
		return Vector3(transform.position.x, transform.position.y, transform.position.z + buffer);
	}
	else if(moveDirection.z < 0.0){
		return Vector3(transform.position.x, transform.position.y, transform.position.z - buffer);
	}
	else if(moveDirection.x < 0.0){
		return Vector3(transform.position.x - buffer, transform.position.y, transform.position.z);
	}
	else if(moveDirection.x > 0.0){
		return Vector3(transform.position.x + buffer, transform.position.y, transform.position.z);
	}
}

function GetSpeed(){
	return moveSpeed;
}

function GetState(){
	return _characterState;
}

function GetCharacterElement(){
	return _characterElement.ToString();
}

function GetDirection(){
	return moveDirection;
}

function IsMoving ()  : boolean
{
	return Mathf.Abs(Input.GetAxisRaw("Vertical")) + Mathf.Abs(Input.GetAxisRaw("Horizontal")) > 0.5;
}

function Reset ()
{
	gameObject.tag = "Player";
}


