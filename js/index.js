/**
 * Created by Clailton on 04/10/2017.
 */

$(document).ready(function(){

    $('.input-tce').hide();
    $('.input-ts').hide();
    $('.input-falha').hide();

    $('#valor-tce').change(function(){
        var tipoTCE = this.value;
        if(tipoTCE != "default"){
            $("#input-tce").attr("placeholder", getPlacehouderInput(tipoTCE));
            $('.input-tce').show();
        } else {
            $('.input-tce').hide();
        }
    });

    $('#valor-ts').change(function(){
        var tipoTS = this.value;
        if(tipoTS != "default"){
            $("#input-ts").attr("placeholder", getPlacehouderInput(tipoTS));
            $('.input-ts').show();
        } else {
            $('.input-ts').hide();
        }
    });

    $('#valor-falha').change(function(){
        var tipoFalha = this.value;
        if(tipoFalha != "default"){
            $("#input-falha").attr("placeholder", getPlacehouderInput(tipoFalha));
            $('.input-falha').show();
        } else {
            $('.input-falha').hide();
        }
    });


    function getPlacehouderInput(valor){

        switch(valor) {
            case "constante":
                return "(0)";
                break;
            case "normal":
                return "(0,0)";
                break;
            case "uniforme":
                return "(0,0)";
                break;
            case "triangular":
                return "(0,0,0)";
                break;
            case "exponencial":
                return "(0,0)";
                break;
            default:
                return "erro";
        }
    }
});
