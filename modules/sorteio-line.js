
export function Sorteio(qtdSorteio, resultado, nomesConfirmados, sorteioAdd) {

    const checkboxes = nomesConfirmados.querySelectorAll("input[type='checkbox']:checked");
    const nomesSelecionados = [];

    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        nomesSelecionados.push({ checkbox, nome: label.textContent });
    });

    if (nomesSelecionados.length === 0) {
        resultado.textContent = "Nenhum nome selecionado.";
        return;
    }

    const qtd = parseInt(qtdSorteio.value, 10);

    if (qtd > nomesSelecionados.length || qtd < 1) {
        resultado.textContent = "Quantidade inválida para o sorteio.";
        return;
    }

    document.querySelector(".input-section").style.display = "none"; // Oculta a seção de sorteio
    document.getElementById("log-section").style.display = "block"; // Mostra a seção dos nomes sorteados

    const sorteados = [];
    const logContainer = document.getElementById('sorteados-log');

    while (sorteados.length < qtd) {
        const indiceAleatorio = Math.floor(Math.random() * nomesSelecionados.length);
        const sorteado = nomesSelecionados[indiceAleatorio];

        nomesSelecionados.splice(indiceAleatorio, 1);
        sorteados.push(sorteado);

        let count = sorteioAdd();

        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        logItem.innerHTML = `${count}º sorteado: <span>${sorteado.nome}</span>`;
        
        logContainer.appendChild(logItem);

        sorteado.checkbox.checked = false;
        sorteado.checkbox.disabled = true;
        sorteado.checkbox.parentElement.style.opacity = '0.5';
    }

    resultado.textContent = ``;
}