
/** 
 * Converte uma string no formato de moeda para um número
 * String '1.200,50' -> Number 1200.5
*/
export default function moedaParaNumero(moeda: string): number | null {
  const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
  return isNaN(numero) ? null : numero;
}