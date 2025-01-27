const inputSorteio = document.getElementById("input-sorteio");
const btnConfirmar = document.getElementById("btn-confirmar");
const nomesConfirmados = document.getElementById("nomes-confirmados");
const btnSorteio = document.getElementById("btn-sortear");
const qtdSorteio = document.getElementById("qtd-sorteio");
const resultado = document.getElementById("resultado"); // Definido corretamente

function capitalize(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

btnConfirmar.addEventListener("click", function () {
    const nomes = inputSorteio.value;
    const listaNomes = nomes.split(",").map(nome => nome.trim()).map(capitalize); // Capitaliza os nomes

    nomesConfirmados.innerHTML = ""; // Limpa os nomes anteriores

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
    const checkboxes = nomesConfirmados.querySelectorAll("input[type='checkbox']");
    const nomesSelecionados = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.nextElementSibling;
            nomesSelecionados.push(label.textContent);
        }
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

    const sorteados = [];
    while (sorteados.length < qtd) {
        const indiceAleatorio = Math.floor(Math.random() * nomesSelecionados.length);
        const nomeSorteado = nomesSelecionados[indiceAleatorio];
        if (!sorteados.includes(nomeSorteado)) {
            sorteados.push(nomeSorteado);
        }
    }

    resultado.textContent = `Sorteados: ${sorteados.join(", ")}`;
});