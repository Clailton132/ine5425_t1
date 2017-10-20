/**
 * Created by Clailton on 10/10/2017.
 */

$(document).ready(function(){
    var loopExecucao;

    $('#start').click(function(){
    	var timer = Number($("#duracao-simulacao").val()) * 60;
    	gerarEntidades(timer);
    });

    function gerarEntidades(timer){
        //TODO para testes, o tempo de simulão foi FIXADO em 24h (1440 minutos)
        //var timer = 1440;
        var timerAux = 0;
        var velocidade = $('#velocidade-Simulacao').val();
        var tipoTCE = $("#input-tce");
        var tipoDistribuicao = $('#valor-tce');
        resetStatus();

        var tec = 0;
        var tempoRelogio = 0;

        //Variáveis Equipamento 1
        var ts_e1 = 0;
        var tempoExecucao_e1 = 0;
        var tempoSaida_e1 = 0;
        var tempoFila_e1 = 0;
        var listaEventoFalha_e1 = geradorTempoEntreFalha(timer, "e1");
        //Iterador da lista de eventos de Falha do equipamento 1
        var iteradorListFalha_e1 = 0;
        //Contador de entidades descartadas
        var entidadeDescartadas_1 = 0;
        //Contador de entidades tipo 2 que são atentidas pelo equipamento 1
        var contadorEntidade2 = 0;
        var tempoLivre_e1 = 0;
        var listaEventos_e1 = [];

        //Variaveis Equipament 2
        var ts_e2 = 0;
        var tempoExecucao_e2 = 0;
        var tempoSaida_e2 = 0;
        var tempoFila_e2 = 0;
        var listaEventoFalha_e2 = geradorTempoEntreFalha(timer, "e2");
        //Iterador da lista de eventos de Falha do equipamento 2
        var iteradorListFalha_e2 = 0;
        //Contador de entidades descartadas
        var entidadeDescartadas_2 = 0;
        //Contador de entidades tipo 1 que são atentidas pelo equipamento 2
        var contadorEntidade1 = 0;
        var tempoLivre_e2 = 0;
        var listaEventos_e2 = [];
        
        //variaveis para acompanhamento da simulação;
        var contadorTEC = 0;
        var status_e1 = "Ativo";
        var status_e2 = "Falha";
        inicioSimulacao();

        function inicioSimulacao(){
            if(verificaInputs()){
                if(velocidade != "max"){
                    loopExecucao = setInterval(function() {
                        tec = geraTEC();
                        startSimulacao(timer, tec);
                        timerAux = timerAux + tec;
                        if(!(timer > timerAux + tec)) {
                            clearInterval(loopExecucao);
                            $('#start').show();
                            $('#botoes-controle').hide();
                            plotaDadosSimulacao(listaEventos_e1, listaEventos_e2);
                        }
                    }, Number(velocidade));
                } else {
                    while(timer > timerAux + tec){
                        tec = geraTEC();
                        startSimulacao(timer, tec);
                        timerAux = timerAux + tec;
                    }
                    clearInterval(loopExecucao);
                    $('#start').show();
                    $('#botoes-controle').hide();
                    plotaDadosSimulacao(listaEventos_e1, listaEventos_e2);
                }
            } else {
                alert("Preencha todos os campos!")
            }
        }

        function startSimulacao(timer, tec){
            //Atualiza Evento de falha atual
            listaEventoFalha_e1[iteradorListFalha_e1].estado =
                atualizaEventoFalha(listaEventoFalha_e1[iteradorListFalha_e1], tempoRelogio);
            listaEventoFalha_e2[iteradorListFalha_e2].estado =
                atualizaEventoFalha(listaEventoFalha_e2[iteradorListFalha_e2], tempoRelogio);

            if(Math.round(Math.random()*10) <= 5){
                //Evento Equipamento 1
                if(listaEventoFalha_e1[iteradorListFalha_e1].estado == "falha") {
                    if(listaEventoFalha_e2[iteradorListFalha_e2].estado == "falha"){
                        console.log("Entidade 1 Descartada");
                        entidadeDescartadas_1++;
                        tempoRelogio = tempoRelogio + tec;
                    } else {
                        equipamentoE2("e1");
                    }
                } else {
                    equipamentoE1("e1");
                }
            } else {
                //Evento Equipamento 2
                if(listaEventoFalha_e2[iteradorListFalha_e2].estado == "falha") {
                    if(listaEventoFalha_e1[iteradorListFalha_e1].estado == "falha"){
                        console.log("Entidade 2 Descartada");
                        entidadeDescartadas_2++;
                        tempoRelogio = tempoRelogio + tec;
                    } else {
                        equipamentoE1("e2");
                    }
                } else {
                    equipamentoE2("e2");
                }
            }

            if(listaEventoFalha_e1[iteradorListFalha_e1].fimFalha <= tempoRelogio){
                iteradorListFalha_e1++;
            }
            if(listaEventoFalha_e2[iteradorListFalha_e2].fimFalha <= tempoRelogio){
                iteradorListFalha_e2++;
            }
            
            contadorTEC++;
            status_e1 = listaEventoFalha_e1[iteradorListFalha_e1].estado;
            status_e2 = listaEventoFalha_e1[iteradorListFalha_e2].estado;
            atualizadaStatus(contadorTEC, status_e1, status_e2);
        }

        function equipamentoE1(entidade){
            if(entidade == "e2"){
                contadorEntidade2++;
            }

            tempoRelogio = tempoRelogio + tec;

            if (ts_e1 > 0) {
                ts_e1 = Number(geradorTServico());
                tempoFila_e1 = tempoSaida_e1 - tempoRelogio;
                tempoLivre_e1 = 0;
                if (tempoFila_e1 <= 0) {
                    tempoFila_e1 = 0;
                }

                if(tempoSaida_e1 - tempoRelogio < 0){
                    tempoLivre_e1 = tempoRelogio - tempoSaida_e1;
                } else {
                    tempoLivre_e1 = 0;
                }
            } else {
                ts_e1 = Number(geradorTServico());
                tempoLivre_e1 = tec;
            }

            tempoExecucao_e1 = ts_e1 + tempoFila_e1;
            tempoSaida_e1 = tempoRelogio + tempoExecucao_e1;

            if(tempoSaida_e1 > timer){
                var tempoSaida_e1aux = "Preso no sistema!";
                listaEventos_e1.push([entidade, tec, tempoRelogio, ts_e1, tempoFila_e1, tempoExecucao_e1, tempoLivre_e1, tempoSaida_e1aux]);
            } else {
                listaEventos_e1.push([entidade, tec, tempoRelogio, ts_e1, tempoFila_e1, tempoExecucao_e1, tempoLivre_e1, tempoSaida_e1]);
            }

        }

        function equipamentoE2(entidade){
            if(entidade == "e1"){
                contadorEntidade1++;
            }

            tempoRelogio = tempoRelogio + tec;

            if (ts_e2 > 0) {
                ts_e2 = Number(geradorTServico());
                tempoFila_e2 = tempoSaida_e2 - tempoRelogio;
                tempoLivre_e2 = 0;
                if (tempoFila_e2 <= 0) {
                    tempoFila_e2 = 0;
                }

                if(tempoSaida_e2 - tempoRelogio < 0){
                    tempoLivre_e2 = tempoRelogio - tempoSaida_e2;
                } else {
                    tempoLivre_e2 = 0;
                }

            } else {
                ts_e2 = Number(geradorTServico());
                tempoLivre_e2 = tec;
            }

            tempoExecucao_e2 = ts_e2 + tempoFila_e2;
            tempoSaida_e2 = tempoRelogio + tempoExecucao_e2;

            if(tempoSaida_e2 > timer){
                var tempoSaida_e2aux = "Preso no sistema!";
                listaEventos_e2.push([entidade, tec, tempoRelogio, ts_e2, tempoFila_e2, tempoExecucao_e2, tempoLivre_e2,  tempoSaida_e2aux]);
            } else {
                listaEventos_e2.push([entidade, tec, tempoRelogio, ts_e2, tempoFila_e2, tempoExecucao_e2, tempoLivre_e2,  tempoSaida_e2]);
            }
        }

        $('#stop').click(function(){
            clearInterval(loopExecucao);
        });

        $('#restart').click(function(){
            inicioSimulacao();
        });
    }

    function geraTEC(){
        var tipoTCE = $("#input-tce");
        var tipoDistribuicao = $('#valor-tce');
        return  gerarDistribuicao(tipoTCE, tipoDistribuicao[0].value);
    }

    function atualizaEventoFalha(Equipamento, tempoRelogio){
        if(tempoRelogio >= Equipamento.inicioFalha &&
            tempoRelogio <= Equipamento.fimFalha){
            return "falha";
        } else {
            return "ativo";
        }
    }

    function geradorTServico(){
        var tipoTS = $("#input-ts");
        var tipoDistribuicao = $('#valor-ts');

        return gerarDistribuicao(tipoTS, tipoDistribuicao[0].value);
    }

    function geradorTempoEntreFalha(timer, equipamento){
        var tipoTFalha = $("#input-tfalha");
        var tipoDistribuicao = $('#tempo-falha');

        var falhaNoTempo = 0;
        var duracaoFalha = 0;
        var fimEventoFalha = 0;
        var tempoEntreFalhas= [];

        while ((timer - falhaNoTempo) >= 0){
            falhaNoTempo = falhaNoTempo + Number(gerarDistribuicao(tipoTFalha, tipoDistribuicao[0].value));
            duracaoFalha = Number(geradorDuracaoFalha());
            fimEventoFalha = falhaNoTempo + duracaoFalha;
            tempoEntreFalhas.push(new Falha(equipamento, falhaNoTempo, fimEventoFalha, "ativo"));
            falhaNoTempo = fimEventoFalha;
        }
        return tempoEntreFalhas;
    }

    function geradorDuracaoFalha() {
        var tipoDFalha = $("#input-falha");
        var tipoDistribuicao = $('#valor-falha');

        return gerarDistribuicao(tipoDFalha, tipoDistribuicao[0].value);
    }

    function atualizadaStatus(contTEC, status_e1, status_e2){
        $('#contador-tec').text(contTEC);

        if(status_e1 == "falha") {
            $('#status-e1').text(status_e1).css('color', 'red');
        } else {
            $('#status-e1').text(status_e1).css('color', 'green');
        }

        if(status_e2 == "falha") {
            $('#status-e2').text(status_e2).css('color', 'red');
        } else {
            $('#status-e2').text(status_e2).css('color', 'green');
        }
    }

    function resetStatus(){
        $('#contador-tec').text("0");
        $('#status-e2').text("Ativo").css('color', 'green');
        $('#status-e1').text("Ativo").css('color', 'green');
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
        return !($('#input-tce').val() == '' ||
        $('#input-ts').val() == '' ||
        $('#input-tfalha').val() == '' ||
        $('#input-falha').val() == '' ||
        $('#duracao-simulacao').val() == '');
    }

    function plotaDadosSimulacao(listaEventos_e1, listaEventos_e2){
        gerarTabelaEquipamento1(listaEventos_e1);
        gerarTabelaEquipamento2(listaEventos_e2);
        geradorEstatisticas(listaEventos_e1, listaEventos_e2);
    }
});
