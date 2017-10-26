/**
 * Created by Clailton on 04/10/2017.
 */

$(document).ready(function(){

    $( '#botoes-controle').hide();
    $('#img-loader').hide();

    $('.input-tce').hide();
    $('.input-ts').hide();
    $('.input-falha').hide();
    $('.input-tfalha').hide();

    // Define valores iniciais para os campos das funçoes geradoras
    // Facilita testar :D
    //$('#valor-tce').val('uniforme');
    //$('#input-tce').val('6,9');
     $('#valor-tce').change(function(){
         var tipoTCE = this.value;
         if(tipoTCE != "default"){
             var atributos =  getAtributosInput(tipoTCE);
             $("#input-tce").attr("placeholder", atributos[0]);
             $("#input-tce").mask(atributos[1], {
                 translation: {
                     'Z': {
                         pattern: /[0-9]/, optional: true
                     }
                 }
             });
             $('.input-tce').show();
         } else {
             $('.input-tce').hide();
         }
     });

    //$('#valor-ts').val('uniforme');
    //$('#input-ts').val('8,13');
    $('#valor-ts').change(function(){
             var tipoTS = this.value;
             if(tipoTS != "default"){
                 var atributos =  getAtributosInput(tipoTS);
                 $("#input-ts").attr("placeholder", atributos[0]);
                 $("#input-ts").mask(atributos[1], {
                     translation: {
                         'Z': {
                             pattern: /[0-9]/, optional: true
                        }
                     }
                 });
                 $('.input-ts').show();
             } else {
                 $('.input-ts').hide();
            }
         });

    //$('#tempo-falha').val('uniforme');
    //$('#input-tfalha').val('45, 60');
     $('#tempo-falha').change(function(){
         var tipoTFalha = this.value;
         if(tipoTFalha != "default"){
            var atributos =  getAtributosInput(tipoTFalha);
             $("#input-tfalha").attr("placeholder", atributos[0]);
             $("#input-tfalha").mask(atributos[1], {
                 translation: {
                     'Z': {
                         pattern: /[0-9]/, optional: true
                     }
                 }
            });
             $('.input-tfalha').show();
         } else {
             $('.input-tfalha').hide();
         }
     });

    //$('#valor-falha').val('constante');
    //$('#input-falha').val('15');
     $('#valor-falha').change(function(){
        var tipoFalha = this.value;
         if(tipoFalha != "default"){
             var atributos =  getAtributosInput(tipoFalha);
             $("#input-falha").attr("placeholder",atributos[0]);
             $("#input-falha").mask(atributos[1  ], {
                 translation: {
                     'Z': {
                         pattern: /[0-9]/, optional: true
                     }
                 }
             });
             $('.input-falha').show();
         } else {
             $('.input-falha').hide();
         }
     });

    //$('#duracao-simulacao').val('1');
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
