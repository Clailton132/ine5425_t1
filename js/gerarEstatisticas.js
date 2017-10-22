/**
 * Created by Clailton on 18/10/2017.
 */

function geradorEstatisticas(equipamento1, equipamento2, 
                             listaEventoFalha_e1, listaEventoFalha_e2, contadorEntidade1, contadorEntidade2){

    //list:
    // 0 - entidade
    // 1 - tec
    // 2 - tempo de chegada no sistema
    // 3 - TS
    // 4 - tempo em fila
    // 5 - tempo de execucao
    // 6 - tempo livre do equipamento
    // 7 - tempo de saida do sistema

    var tempoEmHoras = Number($('#duracao-simulacao').val());
    var entidadesEmFilaE1 = 0;
    var entidadesEmFilaE2 = 0;
    var entidadesAtentidas = 0;
    var somadorTS = 0;
    var somadorTEC = 0;
    var tempoNoSistema = 0;
    var mediaEmFila = 0;
    var tempoEmFalha_e1 = 0;
    var tempoEmFalha_e2 = 0;
    var i;

    for(i = 0; i < equipamento1.length ; i++){
        //Conta quantas entidades ficaram em fila
        if(equipamento1[i][4] > 0 ){
            entidadesEmFilaE1++;
            mediaEmFila = mediaEmFila + equipamento1[i][4];
        }
        //Somatorio de TS do equipamento 1
        somadorTS = somadorTS + equipamento1[i][3];
        //somatorio TEC
        somadorTEC = somadorTEC + equipamento1[i][1];

        tempoNoSistema = tempoNoSistema + (equipamento1[i][3]+equipamento1[i][4]);

        if(!isNaN(equipamento1[i][7])){
            entidadesAtentidas++;
        }
    }
    for(i = 0; i < equipamento2.length; i++){
        //Conta quantas entidades ficaram em fila
        if(equipamento2[i][4] > 0 ){
            entidadesEmFilaE2++;
            mediaEmFila = mediaEmFila + equipamento2[i][4];
        }
        //Somatorio de TS do equipamento 2
        somadorTS = somadorTS + equipamento2[i][3];
        //somatorio TEC
        somadorTEC = somadorTEC + equipamento2[i][1];

        tempoNoSistema = tempoNoSistema + (equipamento2[i][3]+equipamento2[i][4]);

        if(!isNaN(equipamento2[i][7])){
            entidadesAtentidas++;
        }
    }

    //1 - Número Médio de Entidades nas Filas
    var mediaEntidadeNaFila = entidadesEmFilaE1+ entidadesEmFilaE2/ equipamento1.length+ equipamento2.length;
    $("#media-entidade-na-fila").text("Número Médio de Entidades nas Filas: "+mediaEntidadeNaFila.toFixed(2));
    //##################################################################################################################

    //2 - Taxa Média de Ocupação dos Servidores
    var mediaEntidade = (equipamento1.length+equipamento2.length)/tempoEmHoras;
    var taxaServicos = entidadesAtentidas/tempoEmHoras;
    //##################################################################################################################

    if(taxaServicos > mediaEntidade){
        var taxaOcupacaoServidor = mediaEntidade/taxaServicos;
        $('#taxa-media-ocupacao').text("Taxa Média de Ocupação do Servidor: "+taxaOcupacaoServidor+" minutos");
    } else {
        $('#taxa-media-ocupacao').text("Taxa Média de Ocupação do Servidor: Não Aplicavel");
    }
    //##################################################################################################################

    //3 - Tempo Médio de uma Entidade na Fila
    mediaEmFila = mediaEmFila / (equipamento1.length + equipamento2.length);
    $('#media-em-fila').text('Tempo Médio em Fila: '+mediaEmFila.toFixed(2)+" minutos");
    //##################################################################################################################

    //4 - Tempo Médio no Sistema
    tempoNoSistema = tempoNoSistema/(equipamento1.length + equipamento2.length);
    $('#tempo-medio-sistema').text("Tempo médio despendido no sistema: "+tempoNoSistema.toFixed(2)+" minutos");
    //##################################################################################################################

    //5 - Contador de Entidades
    $('#numero-entidades-1').text("Número de entidades do tipo e1 geradas na simulação: "+equipamento1.length);
    $('#numero-entidades-2').text("Número de entidades do tipo e2 geradas na simulação: "+equipamento2.length);
    //##################################################################################################################

    //6 - Falhas: Compute o tempo que cada um dos servidores permaneceu em falha;
    for(i = 0; i < listaEventoFalha_e1.length; i++){
        if(listaEventoFalha_e1[i].estado == "falha"){
            tempoEmFalha_e1 = tempoEmFalha_e1 + listaEventoFalha_e1[i].duracaoFalha;
        }
    }
    for(i = 0; i < listaEventoFalha_e2.length; i++){
        if(listaEventoFalha_e2[i].estado == "falha"){
            tempoEmFalha_e2 = tempoEmFalha_e1 + listaEventoFalha_e2[i].duracaoFalha;
        }
    }
    $('#em-falha-1').text("Tempo total em falha do Equipamento 1: "+tempoEmFalha_e1+" minutos");
    $('#em-falha-2').text("Tempo total em falha do Equipamento 2: "+tempoEmFalha_e2+" minutos");
    //##################################################################################################################

    //7 - Contagem de trocas
    $('#atendiment_cross-1').text("Entidades e2 Atendidas pelo Equipamento 1: "+contadorEntidade2);
    $('#atendiment_cross-2').text("Entidades e1 Atendidas pelo Equipamento 2: "+contadorEntidade1);
    //##################################################################################################################
}