# ine5425_t1

Programa de Simulação em Linguagem de Propósito Geral

__1. Descrição do Sistema__

Desenvolva um programa numa linguagem de propósito geral, que permita a modelagem e a simulação de um
sistema com duas filas e dois servidores. As entidades chegam ao sistema e entram em uma das filas para serem
atendidas por um servidor. A figura 1 abaixo permite visualizar este sistema. As entidades se dividem em dois tipos:
1 e 2. As do tipo 1 são atendidas pelo Server 1 e as do tipo 2 pelo Server 2.

O intervalo de tempo entre a chegada de duas entidades subseqüentes pode ser constante (determinístico) ou
aleatório, obedecendo a alguma distribuição de probabilidades teórica (Normal, Uniforme, Triangular ou
Exponencial) e será denominado Tempo Entre Chegadas (TEC).
No momento em que uma entidade toma um servidor (recurso), esta passa a ser por ele servida durante um período
de tempo ao qual será denominado Tempo de Serviço (TS). Assim como o TEC, o TS pode, também, ser
determinístico (constante) ou aleatório e, neste caso, obedecer a alguma distribuição teórica de probabilidades
(Normal, Uniforme, Triangular ou Exponencial).
Se ao chegar ao sistema uma entidade encontrar o servidor a ela designado ocupado, esta deverá aderir à fila de
espera que se encontre diante deste.
O sistema pode apresentar falhas. Eventualmente os servidores param de operar durante algum tempo. Quando isto
acontece, as entidades que chegam para serem servidas por determinado servidor que esteja fora de operação podem
ser servidas pelo outro, se este estiver ativo. Entidades que já se encontram na fila de espera do servidor falhado, lá
permanecerão. Se os dois servidores estiveram em estado de falha, as entidades devem aguardar em fila até o
servidor voltar à ativa. Dois novos tempos devem, portanto, ser incorporados ao sistema: o tempo entre falhas e o
tempo em falha, para cada servidor. Assim como anteriormente, estes tempos poderão ser determinísticos
(constante) ou aleatórios, obedecendo a alguma distribuição teórica de probabilidades (Normal, Uniforme,
Triangular ou Exponencial).

__2. Estatísticas__

Para medir o desempenho deste sistema, algumas variáveis de respostas devem ser acompanhadas. Para este
programa, as seguintes variáveis abaixo enumeradas devem ser tratadas:

  1. Número Médio de Entidades nas Filas: Ao longo do período simulado, o número de entidades presentes nas
filas dos servidores (uma variável de estado aleatória) se altera, podendo assumir diversos valores discretos.
Para obtermos uma estatística do valor esperado destas variáveis, é necessário um acompanhamento (ao
longo do período simulado) dos diversos valores assumidos e dos períodos de tempo ao longo dos quais estes
permaneceram constantes. Em outras palavras, estas são variáveis dependentes do tempo. Sua obtenção
requer o cálculo de uma média ponderada, cujos pesos serão parcelas (percentuais) do tempo total de
observação (tempo simulado) nos quais a variável n.º de elementos na fila, permaneceu em determinado
estado.
  2. Taxa Média de Ocupação dos Servidores: Assim como o Número Médio de Entidades na Fila, esta também é
uma estatística dependente do tempo. Porém, como sabemos antecipadamente os possíveis estados dos
servidores (neste caso apenas dois: livre ou ocupado), a média ponderada necessária é mais facilmente
calculada. No entanto, observem que ao longo da simulação o servidor poderá estar “fora do ar” em falha.
Assim, para o cálculo desta estatística o tempo “em falha” deve ser abatido do tempo total de simulação.
  3. Tempo Médio de uma Entidade na Fila: Cada uma das entidades que aderem a uma fila dos servidores
despende ali um determinado período de tempo. Este período é também uma variável aleatória, uma vez que
é dependente de TS. O cálculo desta estatística é mais simples que o anterior, requerendo apenas que se
calcule uma média aritmética simples, considerando os tempos de todas as entidades que por ali circularam.
  4. Tempo Médio no Sistema: O tempo despendido no sistema por uma entidade é contado desde o tempo em que
esta entra no sistema, até o momento em que, depois de servida, deixa o sistema. Este tempo deve ser
computado para todas as entidades e também por tipo de entidade.
  5. Contador de Entidades: Este é um elemento típico de qualquer programa de simulação. Trata-se apenas de
um simples acumulador. Neste caso, como o nome pressupõe, deverá incrementar uma variável designada,
sempre que for ativado. Se dois contadores forem colocados no sistema, um na entrada e outro na saída e,
num dado instante interrompermos o processo de simulação, a diferença entre os dois indicará o número de
entidades que se encontram entre os dois pontos naquele momento. Este contador também deve ser
computado para todas as entidades e também por tipo de entidade.
  6. Falhas: Compute o tempo que cada um dos servidores permaneceu em falha ao longo do período simulado.
Compute também quantas vezes cada um deles falhou e o percentual de tempo em falha, com relação ao
tempo total simulado.
  7. Contagem de trocas: Uma vez que diante de falhas pode haver trocas de servidores, compute as estatísticas
relativas ao número de trocas que as entidades realizam. Observação: uma vez que uma entidade tenha optado
pela troca de servidor, esta não poderá deixar a fila mesmo que seu servidor designado volte à ativa.

O programa construído deverá permitir que as estatísticas acima descritas sejam coletadas para que se possa fazer
uma análise do desempenho deste sistema sob diferentes condições de funcionamento. Uma interface gráfica deve
mostrar o comportamento das estatísticas durante a simulação.

__3. Itens que devem ser obrigatoriamente contemplados no seu programa:__

Seja o mais abrangente possível, isto é, que ele possa funcionar diante de diferentes valores associados aos
parâmetros fornecidos. Considere os pontos abaixo:

  1. Funcione de acordo com o enunciado (lógica);
  2. Os Tempos entre Chegadas (TEC1 e TEC2) serem determinísticos ou aleatórios;
  3. Se TEC for aleatório, que possa ser determinado de acordo com diferentes distribuições de probabilidades
indicadas no txto;
  4. O mesmo para os Tempos de Serviço (TS1 e TS2);
  5. O mesmo para os tempos entre falhas e (TEF) e duração da falha (TF);
  6. As filas poderão ser com ou sem limites. No caso das filas serem limitadas, um contador de entidades
bloqueadas deve ser acrescentado às estatísticas;
  7. Permita que o usuário tenha possibilidade de realizar as mudanças nos parâmetros da simulação em cada
execução;
  8. Permita que o usuário possa (de alguma forma) acompanhar a evolução da simulação (variáveis na tela,
gráficos, etc.).
  9. Avanço do tempo pelo controle de eventos (passo variável de acordo com calendário de eventos). Permita
que o usuário possa (de alguma forma) acompanhar o avanço do tempo com passo variável, de acordo com
calendário de eventos;
  10. Permita a parada/continuação da simulação e a observação das estatísticas até aquele momento;
  11. Emita um relatório final contendo todas as estatísticas desejadas.

__Interface do usuário é muito importante em programas de simulação.__

__4. Forma de apresentação (entrega) do programa__

  1. Via Internet Moodle. Uma tarefa será disponibilizada.
  2. Considere que no computador, onde o teste será realizado, exista apenas o SO (Windows) disponível.
  3. Considere que o usuário não conheça nenhuma linguagem de programação.
  4. Um relatório contendo toda a documentação do programa (variáveis, parâmetros, rotinas, classes,
objetos, fluxogramas das rotinas, etc.) deverá ser entregue;
  5. Um pequeno manual sobre como definir ou modificar parâmetros e executar o programa.
  
 __5. Funções a serem Programadas__
 
As seguintes funções deverão estar disponibilizadas no simulador para serem empregadas para TEC1 e
TEC2, TS1, TS2, TEF e TF
 
  1. CONSTANTE
  2. EXPO (Média);
  3. NORMAL (Média, DP);
  4. TRIANGULAR (Min, Moda, Máx);
  5. UNIFORME (Min, Máx);
