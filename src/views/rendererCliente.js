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
    // Desativar os botões
    btnUpdate.disabled = true
    btnDelete.disabled = true
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

// ============================================================
// == CRUD Create/Update ======================================

//Evento associado ao botão submit (uso das validações do html)
frmClient.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
    console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value)
    //Criar um objeto para armazenar os dados do cliente antes de enviar ao main
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
    // Enviar ao main o objeto client - (Passo 2: fluxo)
    // uso do preload.js
    api.newClient(client)
})

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
    foco.value=""
    // Foco no campo nome
    nameClient.focus()
    // Copiar o nome do cliente para o campo nome
    nameClient.value = busca
})

api.setCpf((args) => {
    console.log("Teste do IPC 'set-cpf'")
    // "Recortar" o nome da busca e setar no campo do form
    let buscacpf = document.getElementById('inputCPFClien').value
    let busca = document.getElementById('searchClient').value

    if (buscacpf && busca) {
        buscacpf.value = inputCPFClien;
        busca.value = '';
        buscacpg.focus();
    }
    // Limpar o campo de busca 
    //foco.value=""
    // Foco no campo cpf
    //cpfClient.focus()
    // Copiar o nome do cliente para o campo nome
    //cpfClient.value = buscacpf
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
        })
    })
    }
   

}

// == Fim - CRUD READ =========================================
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