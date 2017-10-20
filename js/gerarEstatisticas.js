/**
 * Created by Clailton on 18/10/2017.
 */

function geradorEstatisticas(equipamento1, equipamento2){

    //Número Médio de Entidades nas Filas
    var entidadesEmFilaE1 = 0;
    var entidadesEmFilaE2 = 0;
    var i;
    for(i = 0; i < equipamento1.length ; i++){
        if(equipamento1[i][4] > 0 ){
            entidadesEmFilaE1++;
        }
    }
    for(i = 0; i < equipamento2.length; i++){
        if(equipamento2[i][4] > 0 ){
            entidadesEmFilaE2++;
        }
    }
    $('#nmEntidade1').text("Número Médio de Entidades nas Filas: "+entidadesEmFilaE1);
    $('#nmEntidade2').text("Número Médio de Entidades nas Filas: "+entidadesEmFilaE2);

    //Taxa Média de Ocupação dos Servidores

    //Tempo Médio de uma Entidade na Fila

    //Tempo Médio no Sistema


    //Contador de Entidades

    //Falhas

    //Contagem de trocas
}