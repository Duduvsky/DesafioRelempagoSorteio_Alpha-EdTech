import { LogLine } from "./log-line.js";

export function Sorteio(qtdSorteio, nomesConfirmados, sorteioAdd) {
    // Pega os nomes selecionados
    const checkboxes = nomesConfirmados.querySelectorAll("input[type='checkbox']:checked");
    let nomesSelecionados = [];

    // Cria um array com os nomes selecionados
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        // Adiciona o nome e o checkbox no array
        nomesSelecionados.push({ checkbox, nome: label.textContent });
    });

    // Verifica se há nomes selecionados
    if (nomesSelecionados.length === 0) {
        alert("Nenhum nome selecionado.");
        return;
    }

    // Pega a quantidade de sorteios
    let qtd = parseInt(qtdSorteio.value, 10);

    // Verifica se a quantidade de sorteios é válida
    if (qtd > nomesSelecionados.length || qtd < 1) {
        alert("Coloque uma quantidade válida");
        return;
    }

    // Embaralha os nomes para garantir aleatoriedade
    nomesSelecionados = nomesSelecionados.sort(() => Math.random() - 0.5);

    document.querySelector(".input-section").style.display = "none"; 
    document.getElementById("log-section").style.display = "block"; 

    const logContainer = document.getElementById('sorteados-log');

    // Sorteia os nomes
    let count = 0;
    const interval = setInterval(() => {
        // Verifica se ainda há nomes para sortear
        if (count < qtd) {
            // Agora os nomes já estão embaralhados
            const sorteado = nomesSelecionados[count]; 
            let contador = sorteioAdd();

            // Cria o item de log
            const logItem = LogLine(contador, sorteado);
            logContainer.appendChild(logItem);

            // Marca o nome como sorteado
            sorteado.checkbox.checked = false;
            sorteado.checkbox.disabled = true;
            sorteado.checkbox.parentElement.style.opacity = '0.5';

            count++;
        } else {
            // Finaliza o intervalo quando todos os nomes forem sorteados
            clearInterval(interval); 
        }
    }, 500); // Intervalo de 0.5 segundo entre cada nome sorteado
}