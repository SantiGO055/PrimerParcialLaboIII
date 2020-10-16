window.addEventListener("load",validar);


// class logueo{
//     constructor(nombre,apellido){
//         this.nombre = nombre;
//         this.apellido = apellido;
//     }

// }
var peticionHttp = new XMLHttpRequest();

var personaAux = [];

function validar(){
    
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var fecha = document.getElementById("fecha");
    var botonModificar = document.getElementById("botonModificar");
    // var mostrarDiv = document.getElementById("botonMostrarDiv");
    var esconderDiv = document.getElementById("btnEsconder");
    var botonEliminar = document.getElementById("botonEliminar");

    // var tabla = document.getElementById("tabla"),rIndex,cIndex;
    
    

    // mostrarDiv.addEventListener("click",accionMostrarDiv);
    esconderDiv.addEventListener("click",cerrarDiv);

    nombre.addEventListener("blur",validarNombre);
    apellido.addEventListener("blur",validarApellido);
    fecha.addEventListener("blur",validarFecha);
    
    //sexo.addEventListener("blur",validarSexo);
    //botonModificar.addEventListener("click",validarBoton);

    leerPersonaGet();

    window.addEventListener("keyup",function(e){
        if(e.keyCode==27) {
            document.getElementById("div").hidden = true;
        }
    });
    
}

function accionMostrarDiv(){
    document.getElementById("div").hidden = false;     
}
function cerrarDiv(){
    document.getElementById("div").hidden = true; 
}
//#region validaciones de campos

function validarNombre(){
    nombreCheck = document.getElementById("nombre");
    if (nombreCheck.value != "") {
        if (nombreCheck.value.length < 3) {
            document.getElementById("nombre").className = document.getElementById("nombre").className = " inputError";
            return false;
        }
        else{
            document.getElementById("nombre").className = document.getElementById("nombre").className.replace(" inputError", "inputSinError");
            
            return true;
        } 
    }
    else{
        alert ("Ingrese nombre");
        return false;
    }
    
}

function validarApellido(){
    apellidoCheck = document.getElementById("apellido");
    
    if (apellidoCheck.value != "") {
        if (apellidoCheck.value.length < 3 || apellidoCheck.value === "") {
            document.getElementById("apellido").className = document.getElementById("apellido").className = " inputError";
            return false;
        }
        else{
            document.getElementById("apellido").className = document.getElementById("apellido").className.replace(" inputError", "inputSinError");
            
            return true;
        }
    }
    else{
        alert ("Ingrese apellido");
        return false;
    }
}
function validarFecha(){
    
    var f = new Date();
    /**Año, mes, dia = aaaa-mm-dd ej. 2020-12-5 */
    fechaHoy =f.getFullYear()+ "-" + (f.getMonth() +1)+ "-" + + f.getDate();
    // fechaHoy = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
    var fechaAModif = $("fecha");
    // console.log(fechaAModif);
    if (!fechaAModif || fechaAModif >= fechaHoy) {
        document.getElementById("fecha").className = document.getElementById("fecha").className = " inputError";
        
        return false;
    }
    else{
        document.getElementById("fecha").className = document.getElementById("fecha").className.replace(" inputError", "inputSinError");
        
        return true;
    }
    // console.log(fechaHoy);
    // if (fechaHoy >= fechaAModif) {
    //     retorno = true;
    //     return retorno;
    // }
    // else{
    //     retorno = false;
    //     return retorno;
    // }
    
}
function validarSexo(){
    //TODO validar que haya uno seleccionado
    var radio = document.getElementsByName('radiobutton');
    if (radio[0].checked === true || radio[1].checked === true) {
        return true;
    }
    else{
        document.getElementById("sexo").className = document.getElementById("sexo").className = " inputError";
        return false;
    }
}
//#endregion


function validarBoton(){
    // if (validarNombre() && validarApellido() && validarFecha() && validarSexo()) {
    //     return true;
    // }
    // else{
    //     alert("Ingrese campos correctos");
    //     return false;
    // }
    if (validarNombre() && validarApellido() && validarFecha()) {
        return true;
    }
    else{
        alert("Ingrese los campos correctos");
        return false;
    }

}


function leerPersonaGet(){
    
    ajax("GET","http://localhost:3000/materias",respuestaGet);
}

function respuestaGet(){
    
    //el servidor responde con un estado que es un numero, un 200 si esta ok
    if (peticionHttp.readyState === XMLHttpRequest.DONE && peticionHttp.status === 200) {
        
        var arrayJson = JSON.parse(peticionHttp.responseText);
        for (let i = 0; i < arrayJson.length; i++) {
            agregarDatos(arrayJson[i].id,arrayJson[i].nombre,arrayJson[i].cuatrimestre,arrayJson[i].fechaFinal,arrayJson[i].turno);
        }
        return arrayJson;
    }
    
}

function agregarDatos(id,nombre,cuatrimestre,fechaFinal,turno){

    var row = document.createElement("tr");

    row.addEventListener("dblclick",modificarDatos);
    row.setAttribute("id",id);

    var colNombre = document.createElement("td");
    // colNombre.addEventListener("dblclick",modificarDatos);
    var textNombre = document.createTextNode(nombre);
    colNombre.appendChild(textNombre);
    // colNombre.setAttribute("id",id);
    row.appendChild(colNombre);

    var colCuatri = document.createElement("td");
    var textCuatri = document.createTextNode(cuatrimestre);
    // colApellido.addEventListener("dblclick",modificarDatos);
    colCuatri.appendChild(textCuatri);
    // colApellido.setAttribute("id",id);
    row.appendChild(colCuatri);

    var colFecha = document.createElement("td");
    var textFecha = document.createTextNode(fechaFinal);
    // colFecha.addEventListener("dblclick",modificarDatos);
    colFecha.appendChild(textFecha);
    // colFecha.setAttribute("id",id);
    row.appendChild(colFecha);

    var colTurno = document.createElement("td");
    var textTurno = document.createTextNode(turno);
    // colSexo.addEventListener("dblclick",modificarDatos);
    colTurno.appendChild(textTurno);
    // colSexo.setAttribute("id",id);
    row.appendChild(colTurno);
    
    
    //#region columnas de accion
    // var colAccion = document.createElement("td");
    // var aEle = document.createElement("a");
    // aEle.setAttribute("href","");
    // aEle.addEventListener("click",eliminarCelda);
    // var aTextElim = document.createTextNode("borrar");
    // aEle.appendChild(aTextElim);
    // colAccion.appendChild(aEle);
    // row.appendChild(colAccion);

    // var colM = document.createElement("td");
    // var aElemId = document.createElement("a");
    // aElemId.setAttribute("id",id);
    // aElemId.setAttribute("hidden","true");
    // colM.appendChild(aElemId);
    // row.appendChild(colM);
    //#endregion
    
    tcuerpo.appendChild(row);

    
}

function MostrarDivModificar(){
    document.getElementById("div").hidden = false;
    
}
function imprimirRadioButton(sexo){
    var radio = document.getElementsByName('radiobutton');

    if(sexo === "Female"){
        radio[0].checked = true;
    }
    else if(sexo === "Male"){
        radio[1].checked = true;
    }
}
function obtenerValoresRadioButton(){
    var radio = document.getElementsByName('radiobutton');

    if (radio[0].checked == true) {
        return "Female";
    }
    else if(radio[1].checked == true){
        return "Male";
    }
}


function modificarDatos(event){
    // var index = celda.parentNode.parentNode.rowIndex;

    event.preventDefault();
    var fila = event.target.parentNode.childNodes;
    var sacoID = event.target.parentNode;
    
    
    var nombre = fila[0].textContent;
    var apellido = fila[1].textContent;
    var fecha = fila[2].textContent;
    var sexo = fila[3].textContent;
    var id = sacoID.getAttribute("id");
    

    // personaAux.push(nombre,apellido,fecha,sexo,id);
    MostrarDivModificar();
    imprimirRadioButton(sexo);
    // console.log("modificando" + nombre + " " + apellido  + " " + fecha + " " + sexo + id);
    
    // document.getElementById("boton").value = "Modificar";
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("fecha").value = fecha;
    
    // document.getElementById("sexo").value = sexo;
    

    botonModificar.addEventListener("click",function(){
        nombreAux = $("nombre");
        apellidoAux = $("apellido");
        fechaAux = $("fecha");
        sexoAux = obtenerValoresRadioButton();
        if (validarBoton()) {
            ejecutarPostModificar(id,nombreAux,apellidoAux,fechaAux,sexoAux);
        }
    });

    botonEliminar.addEventListener("click",function(){
        if (validarBoton()) {
            ejecutarPostEliminar(id);
        }
    });
    
}

/**modifico la celda TR del html, recibo los datos a modificar */
function modificarCelda(id,nombre,apellido,fecha,sexo){
    var tcuerpo = document.getElementById("tcuerpo");
    /**obtengo la lista de personas del html */
    var listaPersonas = tcuerpo.parentNode.childNodes[3].childNodes;
    
    // console.log(tcuerpo.parentNode); /**todo el div tabla*/
    
    // console.log(tcuerpo.parentNode.childNodes); /**objeto de cada elemento de la tabla (thead, tbody)*/
    
    // console.log(tcuerpo.parentNode.childNodes[3]); /**el tbody donde estan todos los datos es el [3] del parent node*/
    
    // console.log(tcuerpo.parentNode.childNodes[3].childNodes); /**uso el childNodes para obtener cada tr de la lista para despues recorrerlo*/


    /**recorro la lista */
    for (let index = 1; index < listaPersonas.length; index++) {
        
        // console.log(listaPersonas[index].getAttribute("id")); /**obtengo el atributo id de ese tr */

        /**si el id de la lista coincide con el que id que viene por parametro, seteo los datos */
        if(listaPersonas[index].getAttribute("id") === id){
            listaPersonas[index].childNodes[0].textContent = nombre;
            listaPersonas[index].childNodes[1].textContent = apellido;
            listaPersonas[index].childNodes[2].textContent = fecha;
            listaPersonas[index].childNodes[3].textContent = sexo;
            return true;
        }
    }
}

function notificacion(modifico,ServidorOk){
    var div = document.createElement("div");
    div.setAttribute("id","notificacion");
    div.setAttribute("class","notificacion notificacionSinError");
    div.setAttribute("hidden","true");
    var cont = document.getElementById("contenedor");
    var textoMensaje = "";
    if(modifico && ServidorOk){
        textoMensaje = document.createTextNode("Datos modificados correctamente");
    }
    else if(modifico && !ServidorOk){
        textoMensaje = document.createTextNode("Error al modificar datos");
        div.setAttribute("class","notificacion notificacionConError");
    }
    else if(!modifico && ServidorOk){
        textoMensaje = document.createTextNode("Datos eliminados correctamente");
    }
    else if(!modifico && !ServidorOk){
        textoMensaje = document.createTextNode("Error al eliminar datos");
        div.setAttribute("class","notificacion notificacionConError");
    }
    
    div.appendChild(textoMensaje);
    cont.appendChild(div);
}

/**Elimino la celda TR del html, recibo el id a eliminar */
function eliminarCelda(id){
    var tabla = document.getElementById("tcuerpo");
    /**obtengo la lista de personas en el html */
    var listaPersonas = tabla.parentNode.childNodes[3].childNodes;
    // console.log(listaPersonas);
    /**recorro la lista */
    for (let index = 1; index < listaPersonas.length; index++) {
        /**obtengo el atributo id de ese tr */
        // console.log(listaPersonas[index]);
        /**si coincide con el que quiero modificar, seteo los datos */
       
        if(listaPersonas[index].getAttribute("id") === id){
            // console.log(listaPersonas[index].getAttribute("id"));
            // console.log(id);
            var fila = listaPersonas[index];
            tabla.removeChild(fila);
            return true;
        }
        //TODO borrar el id del tr que levante de la lista
        // console.log(fila);
        
        // tabla.removeChild(fila);
        // listaPersonas[index].childNodes[0].removeChild(id);
        

    }
    
}
function obtenerIDForm(){
    document.getElementById("")
}
function ejecutarPostModificar(id,nombre,apellido,fecha,sexo){
    let objetoPersona = {"id" : id, "nombre" : nombre, "apellido" : apellido, "fecha" : fecha, "sexo" : sexo };
                        
    var stringJson = JSON.stringify(objetoPersona);
    var sendPost = stringJson;
    ajax("POST","http://localhost:3000/editar",respuestaPostModificar,sendPost)

    document.getElementById("div").hidden = true;
}
function ejecutarPostEliminar(id){
    let objetoPersona = {"id" : id};
                        
    var stringJson = JSON.stringify(objetoPersona);
    var sendPost = stringJson;
    // ajax("POST","http://localhost:3000/eliminar",respuestaPostEliminar,sendPost);
    
    /**implemento el callback de esta manera para poder pasarle el id */
    ajax("POST","http://localhost:3000/eliminar",function(){
        respuestaPostEliminar(id);
    },sendPost);

    document.getElementById("div").hidden = true;
    
}
function respuestaPostEliminar(id){
    document.getElementById("loaderImage").hidden = false;
    if(peticionHttp.readyState == 4){
        if (peticionHttp.status == 200) {
            /**cuando tengo respuesta de servidor lo casteo a obj json */
            var respuesta  = peticionHttp.responseText;
            var respuestaArray = JSON.parse(respuesta);
            if (respuestaArray.type != 'error') {

                document.getElementById("loaderImage").hidden = true;
                notificacion(false,true);
                document.getElementById("notificacion").hidden = true;
                
                eliminarCelda(id);
            }
            else{
                console.log(respuestaArray.type);
                document.getElementById("loaderImage").hidden = true;
                notificacion(false,false);
            }

        }
        else{
            alert("error");
            
        }
    }
}

function respuestaPostModificar(){
    document.getElementById("loaderImage").hidden = false;
    if(peticionHttp.readyState == 4){
        if (peticionHttp.status == 200) {
            /**cuando tengo respuesta de servidor lo casteo a obj json */
            var respuesta  = peticionHttp.responseText;
            var respuestaArray = JSON.parse(respuesta);
            //console.log(respuestaArray);
            if (respuestaArray.type != 'error') {

                document.getElementById("loaderImage").hidden = true;
                notificacion(true,true);
                
                /**tengo que modificar la celda que le hice doble click con los datos que me devolvio */
                modificarCelda(respuestaArray.id,respuestaArray.nombre,respuestaArray.apellido,respuestaArray.fecha,respuestaArray.sexo);
            }
            else{
                console.log(respuestaArray.type);
                document.getElementById("loaderImage").hidden = true;
                notificacion(true,false);
            }

        }
        else{
            alert("error");
            
        }
    }
}
function $(id){
    return document.getElementById(id).value;
}