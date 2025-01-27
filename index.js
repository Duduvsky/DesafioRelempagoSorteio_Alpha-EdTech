const inputSorteio = document.getElementById("input-sorteio");
const btnConfirmar = document.getElementById("btn-confirmar");
const nomesConfirmados = document.getElementById("nomes-confirmados");
const btnSorteio = document.getElementById("btn-sortear");
const qtdSorteio = document.getElementById("qtd-sorteio");
const resultado = document.getElementById("resultado"); // Definido corretamente

let sorteioCount = 0;

function capitalize(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

btnConfirmar.addEventListener("click", function () {
    const nomes = inputSorteio.value;
    const listaNomes = nomes.split(",").map(nome => nome.trim()).map(capitalize); // Capitaliza os nomes

    if (listaNomes.length < 2) {
        alert('Insira pelo menos 2 nomes!');
        return;
    }

    nomesConfirmados.innerHTML = "";
    sorteioCount = 0;
    document.getElementById('sorteados-log').innerHTML = "";

    listaNomes.forEach((nome, index) => {
        const div = document.createElement("div");
        div.classList.add("nome-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = `checkbox-${index}`;

        const label = document.createElement("label");
        label.textContent = nome;
        label.setAttribute("for", `checkbox-${index}`);

        div.append(checkbox, label);
        nomesConfirmados.append(div);
    });
});

btnSorteio.addEventListener("click", function () {
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

    // Array para armazenar os sorteados
    const sorteados = [];
    const logContainer = document.getElementById('sorteados-log');

    // Realiza a quantidade de sorteios especificada
    while (sorteados.length < qtd) {
        // Pega um índice aleatório dos nomes ainda não sorteados
        const indiceAleatorio = Math.floor(Math.random() * nomesSelecionados.length);
        const sorteado = nomesSelecionados[indiceAleatorio];

        // Remove o sorteado da lista para não ser sorteado novamente
        nomesSelecionados.splice(indiceAleatorio, 1);
        sorteados.push(sorteado);

        sorteioCount++;

        // Cria o item de log
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        logItem.innerHTML = `${sorteioCount}º sorteado: <span>${sorteado.nome}</span>`;
        
        // Adiciona ao log
        logContainer.appendChild(logItem);

        // Desabilita o checkbox do nome sorteado
        sorteado.checkbox.checked = false;
        sorteado.checkbox.disabled = true;
        sorteado.checkbox.parentElement.style.opacity = '0.5';
    }

    // Atualiza o resultado com todos os nomes sorteados
    // resultado.textContent = `Sorteados: ${sorteados.map(s => s.nome).join(", ")}`;
});