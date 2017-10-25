/**
 * Created by Clailton on 04/10/2017.
 */

$(document).ready(function(){

    $( '#botoes-controle').hide();
    $('#img-loader').hide();

    // Define valores iniciais para os campos das funçoes geradoras
    // Facilita testar :D
    $('#valor-tce').val('uniforme');
    $('#input-tce').val('6,9');

    $('#valor-ts').val('uniforme');
    $('#input-ts').val('8,13');

    $('#tempo-falha').val('uniforme');
    $('#input-tfalha').val('45, 60');

    $('#valor-falha').val('constante');
    $('#input-falha').val('15');

    $('#duracao-simulacao').val('1');
    ///////////////////////////////////////////////////////////


    $('#valor-tce').change(function() {
        atualizarCampoModificado(this.value, 'input-tce');
    });

    $('#valor-ts').change(function() {
        atualizarCampoModificado(this.value, 'input-ts');
    });

    $('#tempo-falha').change(function() {
        atualizarCampoModificado(this.value, 'input-tfalha');
    });

    $('#valor-falha').change(function() {
        atualizarCampoModificado(this.value, 'input-falha');
    });

    $('#duracao-simulacao').mask("ZZZ", {
                translation: {
                    'Z': {
                        pattern: /[0-9]/, optional: true
                    }
                }
    });

    $('#start').click(function(){
        $('#start').hide();
        $( '#botoes-controle').show();
    });

    $('#reload').click(function(){
        location.reload();
    });


    function atualizarCampoModificado(valorDoCampoOption, nomeDoInput) {
        if(valorDoCampoOption !== "default"){
            var atributos =  getAtributosInput(valorDoCampoOption);
            $(`#${nomeDoInput}`).attr("placeholder", atributos[0]);
            $(`#${nomeDoInput}`).mask(atributos[1], {
                translation: {
                    'Z': {
                        pattern: /[0-9]/, optional: true
                    }
                }
            });
            $(`.${nomeDoInput}`).show();
        } else {
            $(`.${nomeDoInput}`).hide();
        }
    }

    function getAtributosInput(valor){

        switch(valor) {
            case "constante":
                return ["Constante 0-99", "ZZZ"];
                break;
            case "normal":
                return ["Média, DP", "ZZZ,ZZZ"];
                break;
            case "uniforme":
                return ["Min, Máx", "ZZZ,ZZZ"];
                break;
            case "triangular":
                return ["Min, Moda, Máx", "ZZZ,ZZZ,ZZZ"];
                break;
            case "exponencial":
                return ["Média", "ZZZ"];
                break;
            default:
                return "erro";
        }
    }
});
