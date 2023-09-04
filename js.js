
// Mascara que formata o CEP no input
function mascaraCEP(event) {
    const input = event.target;
    let cep = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Limita o CEP a 8 caracteres
    if (cep.length > 8) {
        cep = cep.substring(0, 8);
    }

    if (cep.length === 8) {
        input.value = cep.substr(0, 5) + '-' + cep.substr(5);
    }
}



// Mascara que formata o Celular no input
function formatarTelefone(event) {
    const telefoneInput = event.target;
    const telefone = telefoneInput.value.replace(/\D/g, '');

    // Formata o telefone
    if (telefone.length > 2) {
        telefoneInput.value = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
    }
}



// Mascara que formata o Telefone Fixo no input
function formatarTelefone2(event) {
    const telefoneInput = event.target;
    const telefone = telefoneInput.value.replace(/\D/g, '');

    // Formata o telefone para (XX) XXXX-XXXX
    if (telefone.length >= 10) {
        telefoneInput.value = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6, 10)}`;
    }
}



// Mascara que formata o CPF Fixo no input
function MascaraCPF(cpf) {
    var v = cpf.value;

    if (isNaN(v[v.length - 1]) || v.length > 14) {
        cpf.value = v.substring(0, v.length - 1);
        return;
    }

    cpf.setAttribute("maxlength", "14");

    if (v.length === 3 || v.length === 7) {
        cpf.value += ".";
    } else if (v.length === 11) {
        cpf.value += "-";
    }
}



// Mascara que formata o RG Fixo no input
function MascaraRG(rg) {
    var v = rg.value;

    if (v.length > 12) {
        rg.value = v.substring(0, 12);
        return;
    }

    rg.setAttribute("maxlength", "12");

    if (v.length === 2 || v.length === 6) {
        rg.value += ".";
    } else if (v.length === 10) {
        rg.value += "-";
    }
}



// Função que bloqueia letras 
function blockletras(keypress) {
    // campo senha - bloqueia letras                               
    if (keypress >= 48 && keypress <= 57) {
        return true;
    } else {
        return false;
    }
}

function blockNumbers(keypress) {
    // Campo onde você deseja bloquear números
    if (keypress < 48 || keypress > 57) {
        return true;
    } else {
        return false;
    }
}



// Função para validar CEP usando o serviço ViaCEP
function validarCEP(cep) {
    var xhr = new XMLHttpRequest();
    var url = "https://viacep.com.br/ws/" + cep + "/json/";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            if (!data.erro) {
                console.log("CEP válido. Cidade: " + data.localidade + ", Estado: " + data.uf);
            } else {
                console.log("CEP inválido.");
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}




// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || !/[0-9]{11}/.test(cpf)) {
        console.log("CPF inválido. Deve conter 11 dígitos numéricos.");
        return false;
    }

    // Calcula os dígitos verificadores
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica os dígitos verificadores
    if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        console.log("CPF inválido. Dígitos verificadores não correspondem.");
        return false;
    }

    console.log("CPF válido.");
    return true;
}



//Função que limpa o erro ao digitar no input
function limparErro(campo) {
    var erroElement = document.getElementById(campo + "-erro");
    if (erroElement) {
        erroElement.textContent = "";
    }
}



// Função que valida todos os campos do formulario 
function validacaoForm() {
    var nome = document.getElementById("nome").value;
    var endereco = document.getElementById("endereco").value;
    var bairro = document.getElementById("bairro").value;
    var cep = document.getElementById("cep").value;
    var cidade = document.getElementById("cidade").value;
    var estado = document.getElementById("estado").value;
    var telefoneFixo = document.getElementById("telefoneFixo").value;
    var celular = document.getElementById("celular").value;
    var rg = document.getElementById("rg").value;
    var cpf = document.getElementById("cpf").value;

    // Função para exibir mensagem de erro abaixo de um campo
    function mostrarErro(campo, mensagem) {
        
        var erroElement = document.getElementById(campo + "-erro");
    
        if (!erroElement) {
            erroElement = document.createElement("p");
            erroElement.id = campo + "-erro";
            erroElement.className = "erro"; 
           
            document.getElementById(campo).parentNode.appendChild(erroElement);
        }
        
        erroElement.textContent = mensagem;
        console.log("Erro no campo " + campo + ": " + mensagem);
    }

    // Validação do campo Nome
    if (nome === "") {
        mostrarErro("nome", "O campo nome está vazio");
        return;
    }

    // Validação do campo CEP
    if (cep === "" || !/^\d{5}-\d{3}$/.test(cep)) {
        mostrarErro("cep", "O campo CEP está vazio ou possui um formato inválido");
        return;
    } else {
        validarCEP(cep);
    }
    // Validação do campo Endereço
    if (endereco === "") {
        mostrarErro("endereco", "O campo endereço está vazio");
        return;
    }

    // Validação do campo Bairro
    if (bairro === "") {
        mostrarErro("bairro", "O campo bairro está vazio");
        return;
    }
    if (cidade === "") {
        mostrarErro("cidade", " O campo cidade está vazio");
        return;
    }

    // Validação do campo Estado
    if (estado === "") {
        mostrarErro("estado", "O campo estado está vazio");
        return;
    }

    // Validação do campo Telefone Fixo
    if (telefoneFixo === "" || !/^\(\d{2}\)\s\d{4}-\d{4}$/.test(telefoneFixo)) {
        mostrarErro("telefoneFixo", "O campo felefone fixo está vazio ou possui um formato inválido");
        return;
    }

    // Validação do campo Celular
    if (celular === "" || !/^\(\d{2}\)\s\d{5}-\d{4}$/.test(celular)) {
        mostrarErro("celular", "O campo Celular está vazio ou possui um formato inválido");
        return;
    }

    // Validação do campo RG
    if (rg === "" || !/^\d{2}\.\d{3}\.\d{3}-\d{1}$/.test(rg)) {
        mostrarErro("rg", "O campo RG está vazio ou possui um formato inválido");
        return;
    }

    // Validação do campo CPF
    if (cpf === "" || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        mostrarErro("cpf", "O campo CPF está vazio ou possui um formato inválido");
        return;
    } else {
        if (!validarCPF(cpf)) {
            return; // CPF inválido, não continue com o envio
        }
    }
}

// API que auto-completa os input ao digitar os CEP
document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.querySelector('input[name="cep"]');
    const enderecoInput = document.querySelector('input[name="endereco"]');
    const bairroInput = document.querySelector('input[name="bairro"]');
    const cidadeInput = document.querySelector('input[name="cidade"]');
    const estadoSelect = document.querySelector('select[name="estado"]');

    cepInput.addEventListener("blur", function () {
        const cep = cepInput.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        enderecoInput.value = data.logradouro;
                        bairroInput.value = data.bairro;
                        cidadeInput.value = data.localidade;
                        estadoSelect.value = data.uf;
                    }
                })
                .catch(error => {
                    console.error("Error fetching address data:", error);
                });
        }
    });
});
