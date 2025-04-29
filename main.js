/*
//Requisição Ajax via Jscript Puro
//recuperando o DOM
document.addEventListener("DOMContentLoaded", function () {
    //buscando botão pelo ID
    document.getElementById('btn-buscar-cep').addEventListener('click', function () {
        //Quando acontecer o evento de click, o código abaixo será executado
        //Ajax
        const xhttp = new XMLHttpRequest(); //instanciando o objeto XMLHttpRequest
        const cep = document.getElementById('cep').value; //pegando o valor do campo cep
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`; //montando a URL da requisição
        xhttp.open('GET', endpoint); //abrindo a requisição
        xhttp.send(); //enviando a requisição

        // Processando a resposta da API
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const response = JSON.parse(xhttp.responseText); //convertendo a resposta para JSON
                
                // Preenchendo os campos do formulário com os dados retornados
                if (!response.erro) {
                    document.getElementById('logradouro').value = response.logradouro || '';
                    document.getElementById('bairro').value = response.bairro || '';
                    document.getElementById('cidade').value = response.localidade || '';
                    document.getElementById('estado').value = response.uf || '';
                } else {
                    alert('CEP não encontrado!'); //
                }
            }
        };
    });
}); */

// -----------------------------------------------------------------------


//Requisição via Fetch APi
//recuperando o DOM
document.addEventListener("DOMContentLoaded", function () {
    //adicionando Mascara ao campo cep
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2'); //mascara para o campo cep
    });

    //fazendo validação de preencimento do campo nome e sobrenome
    const form = document.getElementById('form');
    const nomeInput = document.getElementById('nome');
    const sobrenomeInput = document.getElementById('sobrenome');
    const emailInput = document.getElementById('email');
    form.addEventListener('submit', function (event) {
        if (nomeInput.value.trim() === '') {
            alert('Campo nome é obrigatório!');
            nomeInput.focus(); // Coloca o foco no campo nome
            event.preventDefault(); // Impede o envio do formulário
            return false;
        }

        if (sobrenomeInput.value.trim() === '') {
            alert('Campo sobrenome é obrigatório!');
            sobrenomeInput.focus(); // Coloca o foco no campo sobrenome
            event.preventDefault(); // Impede o envio do formulário
            return false;
        }

        if(emailInput.value.trim() === ''){
            alert('Campo email é obrigatório!');
            emailInput.focus(); // Coloca o foco no campo email
            event.preventDefault(); // Impede o envio do formulário
            return false;
        }
        //Valida se email tem @ e .com
        if(!emailInput.value.includes('@') || !emailInput.value.includes('.com')){
            alert('Campo email inválido, certifique que tenha @ e .com');
            emailInput.focus(); // Coloca o foco no campo email
            event.preventDefault(); // Impede o envio do formulário
            return false;
        }
    });
    
    //buscando botão pelo ID
    document.getElementById('btn-buscar-cep').addEventListener('click', function () {
        //Quando acontecer o evento de click, o código abaixo será executado
        //Ajax
        const cep = document.getElementById('cep').value; //pegando o valor do campo cep
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`; //montando a URL da requisição

        //Chamada da API usando Fetch
        fetch(endpoint).then(function(resposta){
            return resposta.json(); //convertendo a resposta para JSON
        })
        //transformando a resposta em JSON
        .then(function(resposta){
            //recuperando os dados
            const logradouro = resposta.logradouro || ''; //se não existir logradouro, retorna vazio
            const bairro = resposta.bairro || ''; //se não existir bairro, retorna vazio
            const cidade = resposta.localidade || ''; //se não existir cidade, retorna vazio
            const estado = resposta.uf || ''; //se não existir estado, retorna vazio
            
            // Corrigindo o uso de document.getElementById
            document.getElementById('logradouro').value = logradouro; //preenchendo o campo logradouro
            document.getElementById('bairro').value = bairro; //preenchendo o campo bairro  
            document.getElementById('cidade').value = cidade; //preenchendo o campo cidade
            document.getElementById('estado').value = estado; //preenchendo o campo estado
        })
        .catch(function(erro){
            alert('CEP não encontrado!'); //caso ocorra erro, exibe mensagem de erro
        })
        .finally(function(){
            console.log('Requisição finalizada!'); //mensagem de requisição finalizada
        })
        

    })
})