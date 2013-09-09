var hasHeart : boolean = false;
var prefabHeart : Transform;

function ShowHeart(){
	if(hasHeart){
		var prefabHeart : Transform = Instantiate(prefabHeart, transform.position, transform.rotation);
	}
}

