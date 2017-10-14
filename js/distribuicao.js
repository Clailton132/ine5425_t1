/**
 * Created by Clailton on 09/10/2017.
 */

$(document).ready(function(){

});
function constante(a) {
    //TODO Usar a constante passada como parametro?
    return a;
    //return Math.round(Math.random());
}

function uniforne(a, b){
    var aleatorio = Math.random();

    return Math.round(a+(b-a)*aleatorio);
}

function triangular(a, b, c) {
    var aleatorio = Math.random();

    if((b-a)/(c-a)<=aleatorio && aleatorio>=0){
        return Math.round(a+Math.sqrt(aleatorio*(b-a)*(c-a)));
    }else{
        return Math.round(c-Math.sqrt((1-aleatorio)*(c-b)*(c-a)));
    }
}

function exponencial(lambda) {
    var aleatorio = Math.random();

    return Math.round(-lambda*Math.log(1-aleatorio));
}

function normal (med, dp){
    var aleatorio = Math.random();
    var aleatorio2 = Math.random();
    var z1 = Math.sqrt(-2*Math.log(aleatorio))*Math.cos(2*Math.PI*aleatorio2);
    return Math.round(med+dp*z1);
}