var elementos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
var resultados = [VKO,VKT,VPT,VDU,VDM,VDD,DKO,DKT,DPT,DDU,DDM,DDD,NDU,NDM,NDD];
$.noConflict();
jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);
    $("#boutForm").on("submit",validarFormularioCombate);
    $("#borrartodos").click(function (event) {
        //attr ---> cambios de atributos
        // prop --> propiedades
        // is ----> validacion booleana
        if($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked",true);
            //
            //checked = checked
            //selected= selected
            //
        }else{
            $("tbody input[type=checkbox]").prop("checked",false);
        }
    });

    function validarFormularioContacto(){
        //recoger los valores de la vista
        var pdni = $("#dni").val();
        var pnombre = $("#nombre").val();
        var papellidos = $("#apellidos").val();
        var ptelefono = $("#telefono").val();
        var valido = false;
        //evaluarlos
        var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
        var nomValido = validarNombre(pnombre);
        var apeValido = validarApellidos(papellidos);
        var teleValido = validarTelefono(ptelefono);
        $("#dni").siblings("div.text-error").text("");
        $("#nombre").siblings("div.text-error").text("");
        $("#apellidos").siblings("div.text-error").text("");
        $("#telefono").siblings("div.text-error").text("");
        if(dniValido&&nomValido&&apeValido&&teleValido){
            // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
            valido = true;
        }else {
            //mostar mensaje de error
            if(!dniValido){
                $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
            }
            if(!nomValido){
                $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
            }
            if(!apeValido){
                $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos 7 letras");
            }
            if(!teleValido){
                $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
            }
            //text y html
        }
        return false;
    }
    cargarArrayElementos();
    function cargarArrayElementos() {
        //recorrer el array
        if (elementos.length > 0) {
            for (var e in elementos) {
                console.log(e);
                var texto = "<tr><td><input type='checkbox' value='" + e + "'></td><td></td><td></td><td></td><td></td><td></td></tr>";
                //añadir el html correspondiente a la página
                $("#tablaElementos tbody").append(texto);
                //-->
            }
            $("#tablaElementos tfoot td").html("<span class='text-error'>Total alumnos:"+alumnos.length,10+"</span>");
        }else{
            $("#tablaElementos").remove();
            $("#listadoElementos").text("No se han encontrado elementos.")
        }
    }
});
function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarApellidos(apellidos) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}
function validarDni(dni) {
    var valido =false;
    const pattern = new RegExp(/\d{8}[A-Za-z]{1}/);
    if(pattern.test(dni)){
        numero = parseInt(dni.substr(0,dni.length-1),10);
        letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra==letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}

function validarFormularioCombate() {
    //recoger los valores de la vista
    var pcompetidor = $("#competidor").val();
    var presultado = $("#resultado").val();
    var pvelada = $("#velada").val();
    var pcomentarios = $("#comentarios").val();
    var valido = false;
    //evaluarlos
    var competidorValido= validarCompetidor(pcompetidor); //en funcion de si estan bien o mal o se envia o no
    var resultadoValido = validarResultado(presultado);
    var veladaValido = validarVelada(pvelada);
    var comentariosValido = validarComentarios(pcomentarios);
    $("#competidor").siblings("div.text-error").text("");
    $("#resultado").siblings("div.text-error").text("");
    $("#velada").siblings("div.text-error").text("");
    $("#comentarios").siblings("div.text-error").text("");
    if(competidorValido&&resultadoValido&&veladaValido&&comentariosValido){
        // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        valido = true;
    }else {
        //mostar mensaje de error
        if(!competidorValido){
            $("#competidor").siblings("div.text-error").text("El competidor no se reconoce.");
        }
        if(!resultadoValido){
            $("#resultado").siblings("div.text-error").text("El resultado no se reconoce.");
        }
        if(!veladaValido){
            $("#velada").siblings("div.text-error").text("La velada no se reconoce.");
        }
        if(!comentariosValido){
            $("#comentarios").siblings("div.text-error").text("Los comentarios no son válidos.");
        }
        //text y html

        return false;
    }
}

function validarCompetidor(pcompetidor) {
    if (elementos.length > 0) {
        return true;
    }
}
function validarResultado(presultado) {
    if (resultados.length > 0) {
        for (var r in resultados) {
            console.log(r);
            if (presultado == r) {
                // var texto = "<tr><td><input type='checkbox' value='" + e + "'></td></tr>";
                // $("#tablaElementos tbody").append(texto);
                return true;
                console.log("All good! :)");
            } else {
                // $("#listadoElementos").text("No se han encontrado elementos.")
                return false;
                console.log("All wrong! :(");
            }
        }
    }
}
function validarVelada() {
    if (elementos.length > 0) {
        return true;
    }
}
function validarComentarios() {
    if (elementos.length > 0) {
        return true;
    }
}
