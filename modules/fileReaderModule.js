// Função para criar uma lista apartir de um arquivo
export function handleFileInputChange(e, inputSorteio, btnConfirmar, capitalize) {
    // Pega o arquivo do input
    const file = e.target.files[0];
    // Se não houver arquivo, retorna
    if (!file) return;

    // Cria um leitor de arquivo
    const reader = new FileReader();
    reader.onload = function(e) {
        // Pega o conteúdo do arquivo
        const content = e.target.result;
        let listaNomes;
        
        // Verifica se o arquivo é CSV ou TXT
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

        // Verifica se a lista de nomes tem pelo menos 2 nomes
        if (listaNomes.length < 2) {
            alert('O arquivo deve conter pelo menos 2 nomes!');
            return;
        }

        // Adiciona os nomes no input de sorteio
        inputSorteio.value = listaNomes.join(', ');
        
        // Simula o clique no botão de confirmar
        btnConfirmar.click();
    };

    // Lê o arquivo como texto
    reader.readAsText(file);
}