//var stringToEdit : String = "--CONTROLS--\n\nMove Character - Arrow keys\nShoot - Space bar\nChange element - Number keys 1-4";
var text : String = "--CONTROLS--\n\nMove Character - Arrow keys\nShoot - Space bar\nChange element - Number keys 1-4";
function OnGUI () {
    
    stringToEdit = GUI.TextArea (Rect (Screen.width/2, Screen.height/2, 250, 150), text, 200);
}