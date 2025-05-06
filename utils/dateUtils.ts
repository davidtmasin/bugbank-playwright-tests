export function getFormattedDatebr(): string {
    const actualDate = new Date();
    return actualDate.toLocaleDateString('pt-BR');
}