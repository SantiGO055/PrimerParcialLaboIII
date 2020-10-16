/**Funcion que recibe el metodo a ejecutar, la ruta, la funcion callback */
var peticionHttp = new XMLHttpRequest();
/**agregar como parametro el callback que recibe una funcion */
function ajax(metodo,ruta, callback,send = ""){
    peticionHttp.onreadystatechange = callback;

    //#region callback comentada
    // function(){
    //     //el servidor responde con un estado que es un numero, un 200 si esta ok
    //     if (peticionHttp.readyState === XMLHttpRequest.DONE && peticionHttp.status === 200) {
    //         console.log(peticionHttp.responseText);
    //         return peticionHttp.responseText;
    //     }
    // }s
    //#endregion callback comentada

    peticionHttp.open(metodo,ruta,true); //true si es asincrono
    /**logica para metodo post */
    if (metodo == 'POST') {
        peticionHttp.setRequestHeader("Content-type","application/json");
        peticionHttp.send(send);
    }
    if(metodo == 'GET'){
        peticionHttp.send();
        
    }
    if (peticionHttp.responseText == true) {
        
        return true;
    }
    else{
        return false;
    }
}