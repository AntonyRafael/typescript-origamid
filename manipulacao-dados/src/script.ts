import { CountList } from "./countBy.js";
import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!data) return;
  
  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes)
}

function preencherLista(lista: CountList, containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  Object.keys(lista).forEach((key) => {
    container.innerHTML += `
      <p>${key}: ${lista[key]}</p>
    `;
  });
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);
  const totalElement = document.querySelector<HTMLElement>("#total span");
  const diaElement = document.querySelector<HTMLElement>("#dia span");

  preencherLista(data.pagamento, "pagamentos");
  preencherLista(data.status, "status");

  if (totalElement) {
    totalElement.textContent = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  if (diaElement) {
    diaElement.innerText = data.melhorDia[0];
  }
}

function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector<HTMLTableElement>("#transacoes tbody");
  if (!tabela) return;
  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
    <tr>
      <td>${transacao.Nome}</td>
      <td>${transacao.Email}</td>
      <td>R$ ${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.Status}</td>
    </tr>
    `
  })
}

handleData();
