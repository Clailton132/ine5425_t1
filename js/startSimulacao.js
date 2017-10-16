/**
 * Created by Clailton on 10/10/2017.
 */

$(document).ready(function(){
    
    //TODO habilitar testes
    var teste = true;
    
    $('#start').click(function(){
        gerarTabela();
        gerarEntidades();
    });

    function gerarEntidades(){
        //TODO para testes, o tempo de simulão foi FIXADO em 24h (1440 minutos)
        var timer = 1440;
        var entidades;
        var equipamento_1;
        var equipamento_2;

        if(verificaInputs()){
            entidades = geradorEntidades(timer);
            equipamento_1 = new Equipamento(geradorTServico(timer),
                geradorTempoEntreFalha(timer), geradorDuracaoFalha(timer), []);

            equipamento_2 = new Equipamento(geradorTServico(timer),
                geradorTempoEntreFalha(timer), geradorDuracaoFalha(timer),[]);
        } else {
            alert("Preencha todos os campos!")
        }

        console.log(equipamento_1);
        console.log(equipamento_2);
    }

    function geradorEntidades(timer) {

        var tipoTCE = $("#input-tce");
        var tipoDistribuicao = $('#valor-tce');
        var tec = 0;
        var ts = 0;
        var tempoFila = 0;
        var tempoNoSistema = 0;
        var tempoExecucao = 0;
        var tempoSaida = 0;
        var entidade_1 = [];
        var entidade_2 = [];
        var listaEventos = [];
        var tempoRelogio = 0;

        while (tempoRelogio <= timer){
            tec = gerarDistribuicao(tipoTCE, tipoDistribuicao[0].value);

            if(Math.round(Math.random()*10) <= 5){
                if(ts > 0) {
                    ts = geradorTServico();
                    tempoFila = tempoExecucao - tempoRelogio;
                    if(tempoFila <= 0){
                        tempoFila = 0;
                    }
                } else {
                    ts = geradorTServico();
                }

                tempoRelogio = tempoRelogio + tec;
                tempoExecucao = ts + tempoFila;
                tempoSaida = tempoRelogio + ts + tempoFila;
                listaEventos.push(new Evento(new Entidade(tec, "e1",tempoExecucao), 0+tempoRelogio));


            } else {
                    if(ts > 0) {
                        ts = geradorTServico();
                        tempoFila = tempoExecucao - tempoRelogio;
                        if(tempoFila <= 0){
                            tempoFila = 0;
                        }
                    } else {
                        ts = geradorTServico();
                    }

                    tempoRelogio = tempoRelogio + tec;
                    tempoExecucao = ts + tempoFila;
                    tempoSaida = tempoRelogio + ts + tempoFila;

                listaEventos.push(new Evento(new Entidade(tec, "e2",tempoNoSistema), 0+tempoRelogio));


            }    
        }

        console.log(listaEventos);

        while(tempoRelogio <= timer){
            tef = geradorTempoEntreFalha();
        }

    }

    function geradorTServico(){
        var tipoTS = $("#input-ts");
        var tipoDistribuicao = $('#valor-ts');

        return gerarDistribuicao(tipoTS, tipoDistribuicao[0].value);
    }

    function geradorTempoEntreFalha(timer){
        var tipoTFalha = $("#input-tfalha");
        var tipoDistribuicao = $('#tempo-falha');
        var df = 0;
        var tempoEntreFalhas= [];

        while ((timer - df) >= 0){
            df = gerarDistribuicao(tipoTFalha, tipoDistribuicao[0].value);
            tempoEntreFalhas.push(df);
            timer = timer - df;
        }
        return tempoEntreFalhas;
    }

    function geradorDuracaoFalha(timer) {
        var tipoDFalha = $("#input-falha");
        var tipoDistribuicao = $('#valor-falha');
        var tf = 0;
        var DuracaoFalhas= [];

        while ((timer - tf) >= 0){
            tf = gerarDistribuicao(tipoDFalha, tipoDistribuicao[0].value);
            DuracaoFalhas.push(tf);
            timer = timer - tf;
        }
        return DuracaoFalhas;
    }

    function gerarDistribuicao(valores, tipo){

        var result, a, b, c;

        switch(tipo) {
            case "constante":
                return constante(valores[0].value);
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
    
    function verificaInputs() {
        return true;
        /*return !($('#input-tce').val() == '' ||
        $('#input-ts').val() == '' ||
        $('#input-tfalha').val() == '' ||
        $('#input-falha').val() == '');*/
    }
});
