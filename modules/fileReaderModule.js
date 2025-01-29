// fileReaderModule.js
export function handleFileInputChange(e, inputSorteio, btnConfirmar, capitalize) {
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
}