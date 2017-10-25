/**
 * Created by Clailton on 10/10/2017.
 */

$(document).ready(function(){
    var loopExecucao;
    var funcaoDistribuicao;

    $('#start').click(function(){
        var timer = Number($("#duracao-simulacao").val()) * 60;
        carregarFuncoes();
        gerarEntidades(timer);
    });

    function carregarFuncoes() {
        const gerador = Distribuicao();

        // Carrega funcoes de TEC
        const nomeFuncaoTEC = $('#valor-tce').val();
        const paramsTEC = $("#input-tce").val();

        // Carrega funcoes de TS
        const nomeFuncaoTS = $('#valor-ts').val();
        const paramsTS = $("#input-ts").val();

        // Carrega funcoes de TEF
        const nomeFuncaoTEF = $('#tempo-falha').val();
        const paramsTEF = $("#input-tfalha").val();

        // Carrega funcoes de TF
        const nomeFuncaoTF = $('#valor-falha').val();
        const paramsTF = $("#input-falha").val();

        funcaoDistribuicao = {
            tec: gerador.gerar(nomeFuncaoTEC, paramsTEC),
            ts: gerador.gerar(nomeFuncaoTS, paramsTS),
            tef: gerador.gerar(nomeFuncaoTEF, paramsTEF),
            tf: gerador.gerar(nomeFuncaoTF, paramsTF) // funcão que gera a duração da falha
        };
    }

    function gerarEntidades(timer){
        //TODO para testes, o tempo de simulação foi FIXADO em 24h (1440 minutos)
        //var timer = 1440;
        var timerAux = 0;
        var velocidade = $('#velocidade-Simulacao').val();
        resetStatus();

        var tec = 0;
        var tempoRelogio = 0;
        var entidadePresaNoSistema = 0;

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
        var duracaoFalha = 0;
        inicioSimulacao();

        function inicioSimulacao(){
            if(verificaInputs()){
                if(velocidade != "max"){
                    loopExecucao = setInterval(function() {
                        tec = funcaoDistribuicao.tec();
                        startSimulacao(timer, tec);
                        timerAux = timerAux + tec;
                        if(!(timer > timerAux + tec)) {
                            clearInterval(loopExecucao);
                            $('#start').show();
                            $('#botoes-controle').hide();
                            plotaDadosSimulacao(listaEventos_e1, listaEventos_e2,
                                listaEventoFalha_e1, listaEventoFalha_e2, contadorEntidade1, contadorEntidade2);
                        }
                    }, Number(velocidade));
                } else {
                    while(timer > timerAux + tec){
                        tec = funcaoDistribuicao.tec();
                        startSimulacao(timer, tec);
                        timerAux = timerAux + tec;
                    }
                    clearInterval(loopExecucao);
                    $('#start').show();
                    $('#botoes-controle').hide();
                    plotaDadosSimulacao(listaEventos_e1, listaEventos_e2,
                        listaEventoFalha_e1, listaEventoFalha_e2, contadorEntidade1, contadorEntidade2);
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
                ts_e1 = funcaoDistribuicao.ts();
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
                ts_e1 = funcaoDistribuicao.ts();
                tempoLivre_e1 = tec;
            }

            tempoExecucao_e1 = ts_e1 + tempoFila_e1;
            tempoSaida_e1 = tempoRelogio + tempoExecucao_e1;

            if(tempoSaida_e1 > timer){
                entidadePresaNoSistema++;
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
                ts_e2 = funcaoDistribuicao.ts();
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
                ts_e2 = funcaoDistribuicao.ts();
                tempoLivre_e2 = tec;
            }

            tempoExecucao_e2 = ts_e2 + tempoFila_e2;
            tempoSaida_e2 = tempoRelogio + tempoExecucao_e2;

            if(tempoSaida_e2 > timer){
                entidadePresaNoSistema++;
                var tempoSaida_e2aux = "Preso no sistema!";
                listaEventos_e2.push([entidade, tec, tempoRelogio, ts_e2, tempoFila_e2, tempoExecucao_e2, tempoLivre_e2,  tempoSaida_e2aux]);
            } else {
                listaEventos_e2.push([entidade, tec, tempoRelogio, ts_e2, tempoFila_e2, tempoExecucao_e2, tempoLivre_e2,  tempoSaida_e2]);
            }
        }

        $('#stop').click(function(){
            plotaDadosSimulacao(listaEventos_e1, listaEventos_e2,
                listaEventoFalha_e1, listaEventoFalha_e2, contadorEntidade1, contadorEntidade2);
            clearInterval(loopExecucao);
        });

        $('#restart').click(function(){
            inicioSimulacao();
        });
    }

    function atualizaEventoFalha(Equipamento, tempoRelogio){
        if(tempoRelogio >= Equipamento.inicioFalha &&
            tempoRelogio <= Equipamento.fimFalha){
            return "falha";
        } else {
            return "ativo";
        }
    }

    function geradorTempoEntreFalha(timer, equipamento) {
        var falhaNoTempo = 0;
        var fimEventoFalha = 0;
        var tempoEntreFalhas= [];

        while ((timer - falhaNoTempo) >= 0) {
            falhaNoTempo = falhaNoTempo + funcaoDistribuicao.tef();
            duracaoFalha = funcaoDistribuicao.tf();
            fimEventoFalha = falhaNoTempo + duracaoFalha;
            tempoEntreFalhas.push(new Falha(equipamento, falhaNoTempo, fimEventoFalha, "ativo", duracaoFalha));
            falhaNoTempo = fimEventoFalha;
        }
        return tempoEntreFalhas;
    }

    function atualizadaStatus(contTEC, status_e1, status_e2){
        $('#contador-tec').text(contTEC);

        if(status_e1 === "falha") {
            $('#status-e1').text(status_e1).css('color', 'red');
        } else {
            $('#status-e1').text(status_e1).css('color', 'green');
        }

        if(status_e2 === "falha") {
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

    function verificaInputs() {
        return $('#input-tce').val()
            && $('#input-ts').val()
            && $('#input-tfalha').val()
            && $('#input-falha').val()
            && $('#duracao-simulacao').val();
    }

    function plotaDadosSimulacao(listaEventos_e1, listaEventos_e2,
                                 listaEventoFalha_e1, listaEventoFalha_e2, contadorEntidade1, contadorEntidade2){
        gerarTabelaEquipamento1(listaEventos_e1);
        gerarTabelaEquipamento2(listaEventos_e2);
        geradorEstatisticas(listaEventos_e1, listaEventos_e2,
            listaEventoFalha_e1, listaEventoFalha_e2, contadorEntidade1, contadorEntidade2);
    }
});
