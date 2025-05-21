// Buscar CEP
function buscarCEP() {
    //console.log("teste do evento blur")
    //armazenar o cep digitado na variável
    let cep = document.getElementById('inputCEPClient').value
    //console.log(cep) //teste de recebimento do CEP
    //"consumir" a API do ViaCEP
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    //acessando o web service par abter os dados
    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            //extração dos dados
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf
        })
        .catch(error => console.log(error))
}

// capturar o foco na busca pelo nome do cliente
// a constante foco obtem o elemento html (input) identificado como 'searchClient'
const foco = document.getElementById('searchClient')

// Criar um vetor globar para manipular os dados do cliente
let arrayClient = []

// Iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', () => {
    // Desativar os botões editar e excluir
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Ativar o botão adicionar
    btnCreate.disabled = false
    // Foco na busca do cliente
    foco.focus()
})

//captura dos dados dos inputs do formulário (Passo 1: Fluxo)
let frmClient = document.getElementById('frmClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let cepClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let neighborhoodClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')
// Uso do ID para o delete e update
let idClient = document.getElementById('inputIdClient')

// ================================================================
// == Manipulação do Enter ========================================

function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault() // ignorar o comportamento padrão
        // executar o método de busca do cliente
        searchName()
    }
}

// "Escuta" do teclado ('keydown' = pressiona tecla)
frmClient.addEventListener('keydown', teclaEnter)

// função para restaurar o padrão (tecla Enter)
function restaurarEnter() {
    frmClient.removeEventListener('keydown', teclaEnter)
}


// == Fim - Manipulação do Enter ==============================
// ============================================================


// ============================================================
// == CRUD Create/Update ======================================

//Evento associado ao botão submit (uso das validações do html)
frmClient.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
    //console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value)
    //Criar um objeto para armazenar os dados do cliente antes de enviar ao main

    // Estratégia para usar o submit para cadastrar um novo Cliente ou editar os dados de um Cliente ja existe
    // verificar se existe o id do cliente
    if (idClient.value === "") {
        // cadastrar um novo cliente
        const client = {
            nameCli: nameClient.value,
            cpfCli: cpfClient.value,
            emailCli: emailClient.value,
            phoneCli: phoneClient.value,
            cepCli: cepClient.value,
            addressCli: addressClient.value,
            numberCli: numberClient.value,
            complementCli: complementClient.value,
            neighborhoodCli: neighborhoodClient.value,
            cityCli: cityClient.value,
            ufCli: ufClient.value
        }
        // Enviar ao main o objeto client - (Passo 2: )
        // uso do preload.js
        api.newClient(client)
    } else {
        // alterar os dados de um cliente existente
        // teste de validação do id
        // console.log(idClient.value)
        // editar um cliente existente
        const client = {
            idCli: idClient.value,
            nameCli: nameClient.value,
            cpfCli: cpfClient.value,
            emailCli: emailClient.value,
            phoneCli: phoneClient.value,
            cepCli: cepClient.value,
            addressCli: addressClient.value,
            numberCli: numberClient.value,
            complementCli: complementClient.value,
            neighborhoodCli: neighborhoodClient.value,
            cityCli: cityClient.value,
            ufCli: ufClient.value
        }
        // enviar ao main o objeto client - (passo 2: fluxo)
        // uso preload.js
        api.updateClient(client)
    }
});

// == Fim CRUD Create/Update ==================================
// ============================================================

// ============================================================
// == CRUD READ ===============================================

// Setar o nome do cliente para fazer um novo cadastro, se a busca retornar que o cliente não está cadastrado.
api.setName((args) => {
    console.log("Teste do IPC 'set-name'")
    // "Recortar" o nome da busca e setar no campo do form
    let busca = document.getElementById('searchClient').value
    // Limpar o campo de busca 
    foco.value = ""
    // Foco no campo nome
    nameClient.focus()
    // Copiar o nome do cliente para o campo nome
    nameClient.value = busca
    // Restaurar tecla enter
    restaurarEnter()
})

api.setCpf((args) => {
    console.log("Teste do IPC 'set-cpf'")
    let busca = document.getElementById('searchClient').value
    foco.value = ""
    cpfClient.focus()
    cpfClient.value = busca.replace(/\D/g, "") // Limpa pontuação se vier com
    restaurarEnter()
})

function searchName() {
    // console.log("Teste do botão buscar")
    // Capturar o nome a ser pesquisado(passo 1)
    let cliName = document.getElementById('searchClient').value
    console.log(cliName) // teste do passo 1
    //validação de campo obrigatorio
    //se o campo de busca não foi prenchimento
    if (cliName === "") {
        //enviar ao maiin um pedido para aletar o usuario
        //precisa usar o preload.js
        api.validateSearch()
    } else {
        // Envair o nome do clinte ao main (passo 2)
        api.searchName(cliName)
        // Receber os dados do cliente (passo 5)
        api.renderClient((event, client) => {
            // Teste de recebimento dos dados do cliente
            console.log(client)
            // Passo 6 renderização dos dados do cliente (preencher os inputs do form) - Não esquecer de converter os dados de string para JSON
            const clientData = JSON.parse(client)
            arrayClient = clientData

            // Uso do forEach para percorrer o vetor e extrair os dados
            arrayClient.forEach((c) => {
                idClient.value = c._id
                nameClient.value = c.nomeCliente
                cpfClient.value = c.cpfCliente
                emailClient.value = c.emailCliente
                phoneClient.value = c.foneCliente
                cepClient.value = c.cepCliente
                addressClient.value = c.logradouroCliente
                numberClient.value = c.numeroCliente
                complementClient.value = c.complementoCliente
                neighborhoodClient.value = c.bairroCliente
                cityClient.value = c.cidadeCliente
                ufClient.value = c.ufCliente
                // Restaurar a tecla Enter
                restaurarEnter()
                // Desativar o botão adicionar
                btnCreate.disabled = true
                // ativar os botões editar e excluir
                btnUpdate.disabled = false
                btnDelete.disabled = false
            })
        })
    }


}

// Função para validar CPF
function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '')
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
  
    let soma = 0, resto
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i)
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== parseInt(cpf[9])) return false
  
    soma = 0
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i)
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0
  
    return resto === parseInt(cpf[10])
  }
  
  // Referência ao campo e mensagem de erro
  const cpfErrorMessage = document.getElementById('cpfErrorMessage')
  
  // Evento input (digitação) para validar em tempo real
  cpfClient.addEventListener('input', () => {
    const cpf = cpfClient.value.trim().replace(/\D/g, '')
  
    if (cpf.length === 11) {
      if (!isValidCPF(cpf)) {
        cpfErrorMessage.textContent = 'CPF inválido.'
        cpfErrorMessage.style.display = 'block'
        cpfClient.classList.add('border', 'border-danger', 'shadow-sm')
  
        setTimeout(() => {
          cpfClient.value = ''
          cpfClient.focus()
          cpfClient.setSelectionRange(0, 0)
        }, 2000)
        return
      }
  
      // CPF válido → remove erro e consulta duplicação
      cpfErrorMessage.style.display = 'none'
      cpfClient.classList.remove('border', 'border-danger', 'shadow-sm')
      window.api.checkCpf(cpf)
    }
  })
  
  // Resposta do backend se o CPF já está em uso
  window.api.cpfInUse((event, exists) => {
    if (exists) {
      cpfErrorMessage.textContent = 'Este CPF já está cadastrado.'
      cpfErrorMessage.style.display = 'block'
      cpfClient.classList.add('border', 'border-danger', 'shadow-sm')
  
      setTimeout(() => {
        cpfClient.value = ''
        cpfClient.focus()
        cpfClient.setSelectionRange(0, 0)
      }, 2000)
    } else {
      cpfErrorMessage.style.display = 'none'
      cpfClient.classList.remove('border', 'border-danger', 'shadow-sm')
    }
  })
  
  
  
  
// == Fim - CRUD READ =========================================
// ============================================================

// ============================================================
// == CRUD Delete =============================================

function removeClient() {
    //console.log(idClient.value) // teste do Passo 1
    // Passo 2 - Envio do id para o main
    api.deleteClient(idClient.value)
}

// == Fim - CRUD Delete =======================================
// ============================================================

// ============================================================
// == Reset Form ==============================================
function resetForm() {
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})
// == Fim Reset Form ==========================================
// ============================================================