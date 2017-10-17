/**
 * Created by Clailton on 13/10/2017.
 */


function gerarTabelaEquipamento1(dataSet){
    //tabela_e1.destroy();
    $('#tabelaSimulacao_e1').dataTable( {
        data: dataSet,
        searching: false,
        destroy: true,
        "columns": [
            { "title": "Equipamento" },
            { "title": "TEC" },
            { "title": "Tempo Chegada no Relogio" },
            { "title": "Tempo Serviço" },
            { "title": "Tempo em Fila" },
            { "title": "Tempo no sistema" },
            { "title": "Tempo Livre Equipamento" }

        ]
    });

}

function gerarTabelaEquipamento2(dataSet){

    $('#tabelaSimulacao_e2').dataTable( {
        data: dataSet,
        searching: false,
        destroy: true,
        "columns": [
            { "title": "Equipamento" },
            { "title": "TEC" },
            { "title": "Tempo Chegada no Relogio" },
            { "title": "Tempo Serviço" },
            { "title": "Tempo em Fila" },
            { "title": "Tempo no sistema" },
            { "title": "Tempo Livre Equipamento" }

        ]
    });
}
