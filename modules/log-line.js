// Função formadora de log com os nomes
export function LogLine(contador, sorteado) {
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `${contador}º sorteado: <span>${sorteado.nome}</span>`;

    return logItem;
}