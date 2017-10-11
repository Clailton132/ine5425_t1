/**
 * Created by Clailton on 10/10/2017.
 */

$(document).ready(function(){
   
    $('#start').click(function(){
        gerarEntidades();
    });
    
    //TODO para testes, o tempo de simulão foi FIXADO em 24h (1440 minutos)
    var timer = 1440;

    function gerarEntidades(){

        if(verificaInputs()){
            geradorEntidades();
        } else {
            alert("Preencha todos os campos!")
        }

    }

    function geradorEntidades() {

        var tipoTCE = $("#input-tce");
        var tipoDistribuicao = $('#valor-tce');
        var tce = 0;
        var entidade_1 = [];
        var entidade_2 = [];

        while ((timer - tce) >= 0){
            tce = gerarDistribuicao(tipoTCE, tipoDistribuicao[0].value);

            if(Math.round(Math.random()*10) <= 5){
                entidade_1.push(new Entidade(tce, "e1", "vermelho"));
                timer = timer - tce;
            } else {
                entidade_2.push(new Entidade(tce, "e2", "verde"));
                timer = timer - tce;
            }    
        }

        console.log(entidade_1);
        console.log(entidade_2);
        
    }

    function gerarDistribuicao(valores, tipo){

        var result, a, b, c;

        switch(tipo) {
            case "constante":
                return constante();
                break;
            case "normal":
                result = (valores[0].value).split(",");
                var med = Number(result[0]);
                var dp = Number(result[1]);
                return normal (med, dp);
                break;
            case "uniforme":
                result = (valores[0].value).split(",");
                a = Number(result[0]);
                b = Number(result[1]);
                return uniforne(a, b);
                break;
            case "triangular":
                result = (valores[0].value).split(",");
                a = Number(result[0]);
                b = Number(result[1]);
                c = Number(result[2]);
                return triangular(a, b, c);
                break;
            case "exponencial":
                var lambda = Number((valores[0].value).split(","));
                return exponencial(lambda);
                break;
            default:
                return "erro";
        }
    }

    function Entidade(tce, tipo, cor) {
        this.tce = tce;
        this.tipo = tipo;
        this.cor = cor;
    }

    function verificaInputs() {
        return true;
        /*return !($('#input-tce').val() == '' ||
        $('#input-ts').val() == '' ||
        $('#input-tfalha').val() == '' ||
        $('#input-falha').val() == '');*/
    }
});
