// Função formadora de tags com os nomes
export function TagLine(nome, index) {
    const div = document.createElement("div");
    div.classList.add("nome-item");

    // Cria um checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.id = `checkbox-${index}`;

    // Cria uma label para o checkbox
    const label = document.createElement("label");
    label.textContent = nome;
    label.style.color = "blue"
    label.setAttribute("for", `checkbox-${index}`);

    div.append(checkbox, label);

    return div;
}