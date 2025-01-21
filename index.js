const inputSorteio = document.getElementById("input-sorteio")
const btnSorteio = document.getElementById("btn-sorteio")
const nomesConfirmados = document.getElementById("nomes-confirmados")

btnSorteio.addEventListener("click", function() {
    const nomes = inputSorteio.value
    // console.log(nomes)
    const listaNomes = nomes.split(",").map(nome => nome.trim());

    nomesConfirmados.innerHTML = ""

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


})