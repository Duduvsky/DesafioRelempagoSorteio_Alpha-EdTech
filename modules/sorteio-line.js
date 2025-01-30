export function Sorteio(qtdSorteio, resultado, nomesConfirmados, sorteioAdd) {
    const checkboxes = nomesConfirmados.querySelectorAll("input[type='checkbox']:checked");
    let nomesSelecionados = [];

    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        nomesSelecionados.push({ checkbox, nome: label.textContent });
    });

    if (nomesSelecionados.length === 0) {
        resultado.textContent = "Nenhum nome selecionado.";
        return;
    }

    let qtd = parseInt(qtdSorteio.value, 10);

    if (qtd > nomesSelecionados.length || qtd < 1) {
        alert("Coloque uma quantidade válida");
        return;
    }

    // Embaralha os nomes para garantir aleatoriedade
    nomesSelecionados = nomesSelecionados.sort(() => Math.random() - 0.5);

    document.querySelector(".input-section").style.display = "none"; 
    document.getElementById("log-section").style.display = "block"; 

    const logContainer = document.getElementById('sorteados-log');

    let count = 0;
    const interval = setInterval(() => {
        if (count < qtd) {
            const sorteado = nomesSelecionados[count]; // Agora os nomes já estão embaralhados
            let contador = sorteioAdd();

            // Cria o item de log
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `${contador}º sorteado: <span>${sorteado.nome}</span>`;

            logContainer.appendChild(logItem);

            // Marca o nome como sorteado
            sorteado.checkbox.checked = false;
            sorteado.checkbox.disabled = true;
            sorteado.checkbox.parentElement.style.opacity = '0.5';

            count++;
        } else {
            clearInterval(interval); // Finaliza o intervalo quando todos os nomes forem sorteados
        }
    }, 500); // Intervalo de 0.5 segundo entre cada nome sorteado
}