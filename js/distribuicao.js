function Distribuicao() {

    const funcoes = {
        constante: function(a) {
            return a;
        },

        uniforme: function(a, b) {
            return Math.round(a + (b - a) * Math.random());
        },

        triangular: function(a, b, c) {
            const aleatorio = Math.random();

            if ((b - a) / (c - a) <= aleatorio && aleatorio >= 0) {
                return Math.round(a + Math.sqrt(aleatorio * (b - a) * (c - a)));
            } else {
                return Math.round(c - Math.sqrt((1 - aleatorio) * (c - b) * (c - a)));
            }
        },

        exponencial: function(lambda) {
            return Math.round(-lambda * Math.log(1 - Math.random()));
        },

        normal: function(med, dp) {
            const aleatorio = Math.random();
            const aleatorio2 = Math.random();
            const z1 = Math.sqrt(-2 * Math.log(aleatorio)) * Math.cos(2 * Math.PI * aleatorio2);
            return Math.round(med + dp * z1);
        }
    };

    return {
        gerar: function(tipo, valores) {
            if (!(tipo in funcoes)) {
                throw new TypeError(`Função '${tipo}' de problabilidade não encontrada`);
            }

            return () => funcoes[tipo](...(valores.split(",").map(Number)));
        }
    };
}
