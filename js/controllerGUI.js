/**
 * Created by Clailton on 04/10/2017.
 */

//Variável global no sistema q para a simulção;
stopSimulacao = false;
reloadSimulacao = false; 

$(document).ready(function(){


// $('.input-tce').hide();
    // $('.input-ts').hide();
    // $('.input-falha').hide();
    // $('.input-tfalha').hide();

    $('#img-loader').hide();

    $('#valor-tce').val('uniforme');
    $('#input-tce').val('6,9');
    // $('#valor-tce').change(function(){
    //     var tipoTCE = this.value;
    //     if(tipoTCE != "default"){
    //         var atributos =  getAtributosInput(tipoTCE);
    //         $("#input-tce").attr("placeholder", atributos[0]);
    //         $("#input-tce").mask(atributos[1], {
    //             translation: {
    //                 'Z': {
    //                     pattern: /[0-9]/, optional: true
    //                 }
    //             }
    //         });
    //         $('.input-tce').show();
    //     } else {
    //         $('.input-tce').hide();
    //     }
    // });

    $('#valor-ts').val('uniforme');
    $('#input-ts').val('8,13');
    // $('#valor-ts').change(function(){
    //     var tipoTS = this.value;
    //     if(tipoTS != "default"){
    //         var atributos =  getAtributosInput(tipoTS);
    //         $("#input-ts").attr("placeholder", atributos[0]);
    //         $("#input-ts").mask(atributos[1], {
    //             translation: {
    //                 'Z': {
    //                     pattern: /[0-9]/, optional: true
    //                 }
    //             }
    //         });
    //         $('.input-ts').show();
    //     } else {
    //         $('.input-ts').hide();
    //     }
    // });

    $('#tempo-falha').val('uniforme');
    $('#input-tfalha').val('45, 60');
    // $('#tempo-falha').change(function(){
    //     var tipoTFalha = this.value;
    //     if(tipoTFalha != "default"){
    //         var atributos =  getAtributosInput(tipoTFalha);
    //         $("#input-tfalha").attr("placeholder", atributos[0]);
    //         $("#input-tfalha").mask(atributos[1], {
    //             translation: {
    //                 'Z': {
    //                     pattern: /[0-9]/, optional: true
    //                 }
    //             }
    //         });
    //         $('.input-tfalha').show();
    //     } else {
    //         $('.input-tfalha').hide();
    //     }
    // });

    $('#valor-falha').val('constante');
    $('#input-falha').val('15');
    // $('#valor-falha').change(function(){
    //     var tipoFalha = this.value;
    //     if(tipoFalha != "default"){
    //         var atributos =  getAtributosInput(tipoFalha);
    //         $("#input-falha").attr("placeholder",atributos[0]);
    //         $("#input-falha").mask(atributos[1  ], {
    //             translation: {
    //                 'Z': {
    //                     pattern: /[0-9]/, optional: true
    //                 }
    //             }
    //         });
    //         $('.input-falha').show();
    //     } else {
    //         $('.input-falha').hide();
    //     }
    // });

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

    $('#duracao-simulacao').mask("ZZZ", {
                translation: {
                    'Z': {
                        pattern: /[0-9]/, optional: true
                    }
                }
            });

    $( '#stopSimulacao').click(function(){
        stopSimulacao = true;
    });

    $('#reload').click(function(){
        location.reload();
    });
});
