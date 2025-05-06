export function formatDecimalToComma(value: string | number): string {
  return value.toString().replace('.', ',');
}

/**
 * Converte string com vírgula para número (ex: "1000,00" => 1000.00)
 */
export function parseStringToNumber(value: string): number {
  // return parseFloat(value.replace('.', '').replace(',', '.'));
  return parseFloat(value.replace(',', '.'));
}

/**
 * Converte número para string com vírgula (ex: 1000.5 => "1000,50")
 */
export function formatNumberToString(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

/**
 * Subtrai duas strings formatadas com vírgula e retorna o resultado também como string formatada.
 * Ex: "1000,00" - "250,00" => "750,00"
 */
export function subtractFormattedStrings(minuend: string, subtrahend: string): string {
  const num1 = parseStringToNumber(minuend);
  // console.log("Saldo anterior: "+num1);
  const num2 = parseStringToNumber(subtrahend);
  // console.log("Valor transferido: "+num2);
  const result = num1 - num2;
  // console.log("Resultado da subtração: "+result);

  return formatNumberToString(result);
}