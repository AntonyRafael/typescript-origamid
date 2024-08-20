import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";
export default function normalizarTransacao(transacao) {
    return {
        Nome: transacao.Nome,
        ID: transacao.ID,
        Data: stringToDate(transacao.Data),
        Status: transacao.Status,
        Email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: moedaParaNumero(transacao["Valor (R$)"]),
        pagamento: transacao["Forma de Pagamento"],
        novo: Boolean(transacao["Cliente Novo"]),
    };
}
;
//# sourceMappingURL=normalizarTransacao.js.map