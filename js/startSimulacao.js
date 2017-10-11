/**
 * Created by Clailton on 10/10/2017.
 */

$(document).ready(function(){
   
    $('#start').click(function(){
        gerarEntidades();
    });
    
    function gerarEntidades(){

        if(verificaInputs()){
            var tipoTCE = $("#input-tce");
            var tipoDistribuicao = $('#valor-tce');
            var tce = gerarDistribuicao(tipoTCE, tipoDistribuicao[0].value);
            console.log(tce);
        } else {
            alert("Preencha todos os campos!")
        }

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
    function entidade(){
        this.tipoEntidade = tipo;
        this.TCE = tce
    }

    function verificaInputs() {
        return true;
        /*return !($('#input-tce').val() == '' ||
        $('#input-ts').val() == '' ||
        $('#input-tfalha').val() == '' ||
        $('#input-falha').val() == '');*/
    }
});
