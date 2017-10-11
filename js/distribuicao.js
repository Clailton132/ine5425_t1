/**
 * Created by Clailton on 09/10/2017.
 */

$(document).ready(function(){

});
function constante() {

    return Math.random();
}

function uniforne(a, b){
    var aleatorio = Math.random();

    return a+(b-a)*aleatorio;
}

function triangular(a, b, c) {
    var aleatorio = Math.random();

    if((b-a)/(c-a)<=aleatorio && aleatorio>=0){
        return a+Math.sqrt(aleatorio*(b-a)*(c-a));
    }else{
        return c-Math.sqrt((1-aleatorio)*(c-b)*(c-a));
    }
}

function exponencial(lambda) {
    var aleatorio = Math.random();

    return -lambda*Math.log(1-aleatorio);
}

function normal (med, dp){
    var aleatorio = Math.random();
    var aleatorio2 = Math.random();
    var z1 = Math.sqrt(-2*Math.log(aleatorio))*Math.cos(2*Math.PI*aleatorio2);
    return med+dp*z1;
}