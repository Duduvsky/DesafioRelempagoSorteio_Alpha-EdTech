// Importa os módulos necessários
import { TagLine } from "./modules/tag-line.js";
import { handleFileInputChange } from "./modules/fileReaderModule.js";
import { Sorteio } from "./modules/sorteio-line.js";

// Seleciona os elementos do DOM
const inputSorteio = document.getElementById("input-sorteio");
const btnConfirmar = document.getElementById("btn-confirmar");
const nomesConfirmados = document.getElementById("nomes-confirmados");
const btnSorteio = document.getElementById("btn-sortear");
const qtdSorteio = document.getElementById("qtd-sorteio");
const btnVoltar = document.getElementById("btn-voltar");
const fileInput = document.getElementById("file-input");

// Variável para contar a quantidade de sorteios
let sorteioCount = 0;

// Função para capitalizar a primeira letra de um nome
function capitalize(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}
// Função para incrementar o contador de sorteio
function sorteioAdd() {
    sorteioCount++;
    return sorteioCount;
}

// Evento de clique no botão de confirmar
btnConfirmar.addEventListener("click", function () {
    const nomes = inputSorteio.value;
    const listaNomes = nomes.split(",").map(nome => nome.trim()).map(capitalize);

    // Verifica se a lista de nomes tem pelo menos 2 nomes
    if (listaNomes.length < 2) {
        alert('Insira pelo menos 2 nomes!');
        return;
    }

    // Limpa a lista de nomes confirmados
    nomesConfirmados.innerHTML = "";
    sorteioCount = 0;
    document.getElementById('sorteados-log').innerHTML = "";

    // Adiciona os nomes na lista de nomes confirmados
    listaNomes.forEach((nome, index) => {
        // Cria a tag com o nome
        const tag = TagLine(nome, index);
        nomesConfirmados.appendChild(tag);
    });
});

// Evento de clique no botão de sortear
btnSorteio.addEventListener("click", function () {
    // Chama a função de sorteio e monta o histórico
    Sorteio(qtdSorteio, nomesConfirmados, sorteioAdd);
});

// Evento de clique no botão de limpar histórico
document.getElementById("limpar-historico").addEventListener("click", () => {
    // Limpa todos os nomes da div do histórico
    document.getElementById('sorteados-log').innerHTML = ''; 
    // Reseta a contagem do sorteio
    sorteioCount = 0; 
});

// Evento de clique no botão de voltar
btnVoltar.addEventListener("click", function () {
    document.querySelector(".input-section").style.display = "block";
    document.getElementById("log-section").style.display = "none"; 
});

// Evento de mudança no input de arquivo
fileInput.addEventListener("change", function(e) {
    // Chama a função de leitura de arquivo e monta a lista de nomes
    handleFileInputChange(e, inputSorteio, btnConfirmar, capitalize);
});