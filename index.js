const inputSorteio = document.getElementById("input-sorteio");
const btnConfirmar = document.getElementById("btn-confirmar");
const nomesConfirmados = document.getElementById("nomes-confirmados");
const btnSorteio = document.getElementById("btn-sortear");
const qtdSorteio = document.getElementById("qtd-sorteio");
const resultado = document.getElementById("resultado");
const btnVoltar = document.getElementById("btn-voltar");

const fileInput = document.getElementById("file-input");

let sorteioCount = 0;

function capitalize(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

btnConfirmar.addEventListener("click", function () {
    const nomes = inputSorteio.value;
    const listaNomes = nomes.split(",").map(nome => nome.trim()).map(capitalize);

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
        label.style.color = "blue"
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

    document.querySelector(".input-section").style.display = "none"; // Oculta a seção de sorteio
    document.getElementById("log-section").style.display = "block"; // Mostra a seção dos nomes sorteados

    const sorteados = [];
    const logContainer = document.getElementById('sorteados-log');

    let count = 0;
    const interval = setInterval(() => {
        if (count < qtd) {
            const sorteado = nomesSelecionados[count];

            nomesSelecionados.splice(count, 1); // Remove o nome sorteado da lista

            // Cria o item de log
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `${sorteioCount + 1}º sorteado: <span>${sorteado.nome}</span>`;
            
            logContainer.appendChild(logItem);
            sorteioCount++;

            // Marca o nome como sorteado
            sorteado.checkbox.checked = false;
            sorteado.checkbox.disabled = true;
            sorteado.checkbox.parentElement.style.opacity = '0.5';

            count++;
        } else {
            clearInterval(interval); // Finaliza o intervalo quando todos os nomes forem sorteados
        }
    }, 700); // Intervalo de 1 segundo entre cada nome sorteado
});

document.getElementById("limpar-historico").addEventListener("click", () => {
    document.getElementById('sorteados-log').innerHTML = ''; // Limpa todos os nomes da div do histórico
    sorteioCount = 0; // Reseta a contagem do sorteio
});

btnVoltar.addEventListener("click", function () {
    // Volta para a tela de sorteio
    document.querySelector(".input-section").style.display = "block";
    document.getElementById("log-section").style.display = "none"; 

    // Limpa o histórico de sorteados ao voltar
    // document.getElementById('sorteados-log').innerHTML = "";
    // sorteioCount = 0;
});

fileInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        let listaNomes;
        
        if (file.name.endsWith('.csv')) {
            // Para CSV, assume que os nomes estão na primeira coluna
            listaNomes = content
                .split('\n')
                .map(line => line.split(',')[0].trim())
                .filter(nome => nome.length > 0)
                .map(capitalize);
        } else if(file.name.endsWith('.txt')) {
            // Para TXT, assume um nome por linha
            listaNomes = content
                .split('\n')
                .map(nome => nome.trim())
                .filter(nome => nome.length > 0)
                .map(capitalize);
        }

        if (listaNomes.length < 2) {
            alert('O arquivo deve conter pelo menos 2 nomes!');
            return;
        }

        inputSorteio.value = listaNomes.join(', ');
        
        btnConfirmar.click();
    };

    reader.readAsText(file);
});