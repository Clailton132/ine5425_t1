/**
 * Created by Clailton on 14/10/2017.
 */

function FluxoSimulacao(equipamento1, equipamento2, timer){

    var tempoDeSimulacao = 0;
    var filaDeEvento = [];

    var falhaE1 = 0;
    var contadorFalhaE1 = 0;
    var duracaoFalhaE1 = 0;
    var iteradorE1 = 0;
    var tempoTS_e1 = 0;

    var falhaE2 = 0;
    var contadorFalhaE2 = 0;
    var duracaoFalhaE2 = 0;
    var iteradorE2 = 0;

    var entidade;

    while(timer > 0){
        filaDeEvento.push(entidade = geradorEntidades());
        if(entidade.tipo = "e1") {
            tempoTS_e1 = geradorTS();
            if(!(tce + tempoTS_e1 > equipamento1.tempoEntreFalha[iteradorE1])){
                if(equipamento1.fila.length = 0){
                    tce
                }
            }
        }
    }


}
function geradorEntidades() {

    var tipoTCE = $("#input-tce");
    var tipoDistribuicao = $('#valor-tce');
    var tce = 0;

    tce = gerarDistribuicao(tipoTCE, tipoDistribuicao[0].value);

    if(Math.round(Math.random()*10) <= 5){
        return new Entidade(tce, "e1", "vermelho");
    } else {
        return new Entidade(tce, "e2", "verde");
    }
}

function geradorTServico(timer){
    var tipoTS = $("#input-ts");
    var tipoDistribuicao = $('#valor-ts');
    var ts = gerarDistribuicao(tipoTS, tipoDistribuicao[0].value);

    return tsEquipamento;
}