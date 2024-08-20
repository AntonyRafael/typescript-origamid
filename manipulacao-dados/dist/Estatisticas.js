import countBy from "./countBy.js";
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamento;
    status;
    semana;
    melhorDia;
    constructor(trasnsacoes) {
        this.transacoes = trasnsacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    setTotal() {
        return this.transacoes.filter(filtrarValor).reduce((acc, transacao) => {
            return acc + transacao.valor;
        }, 0);
    }
    setPagamento() {
        return countBy(this.transacoes.map(({ pagamento }) => pagamento));
    }
    setStatus() {
        return countBy(this.transacoes.map(({ Status }) => Status));
    }
    setSemana() {
        const semana = {
            ['Domingo']: 0,
            ['Segunda']: 0,
            ['Terça']: 0,
            ['Quarta']: 0,
            ['Quinta']: 0,
            ['Sexta']: 0,
            ['Sabado']: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const day = this.transacoes[i].Data.getDay();
            if (day === 0)
                semana['Domingo']++;
            if (day === 1)
                semana['Segunda']++;
            if (day === 2)
                semana['Terça']++;
            if (day === 3)
                semana['Quarta']++;
            if (day === 4)
                semana['Quinta']++;
            if (day === 5)
                semana['Sexta']++;
            if (day === 6)
                semana['Sabado']++;
        }
        return semana;
    }
    setMelhorDia() {
        return Object.entries(this.semana).sort((a, b) => b[1] - a[1])[0];
    }
}
//# sourceMappingURL=Estatisticas.js.map