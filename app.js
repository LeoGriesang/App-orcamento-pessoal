const ano = document.querySelector('#ano'); 
const mes = document.querySelector('#mes'); 
const dia = document.querySelector('#dia'); 
const tipo = document.querySelector('#tipo'); 
const descricao = document.querySelector('#descricao'); 
const valor = document.querySelector('#valor'); 
const btn = document.querySelector('.btn'); 

const modal = document.querySelector('.modal-container');
const btnModal = document.querySelector('#btn-modal');
const h1modal = document.querySelector('.modal-titulo');
const pmodal = document.querySelector('.modal-paragrafo');

btn.addEventListener('click', handleClick) 

class Despesa { 
    constructor(ano, mes, dia, tipo, descricao, valor) { 
        this.ano = ano, 
        this.mes = mes,
        this.dia = dia, 
        this.tipo = tipo, 
        this.descricao = descricao,
        this.valor = valor 
    } 

    validarDados() {
        for (let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}
class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getproximoId() {
        let proximoId = localStorage.getItem('id')
        return (+proximoId + 1);
    }
    gravar(d) { 
        let id = this.getproximoId()
        localStorage.setItem(id, JSON.stringify(d)); 
        localStorage.setItem('id', id);
    }
    recuperarTodosRegistros() {
        let despesas = Array();

        let id = localStorage.getItem('id');
        for(let i = 1; i <= id; i++) {

            //recupera a despesa no seu id
            let despesa = JSON.parse(localStorage.getItem(i))
            //verifica se alguma despesa é null e pula ela
            if(despesa === null) {
                continue;
            }
            despesa.id = i
            //coloca despesa dentro do array
            despesas.push(despesa)
        }
        return despesas;
    }
    pesquisar(despesa) {
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros();
        //ano
        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano) 
        }
        //mes
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes) 
        }
        //dia
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia) 
        }
        //tipo
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter((d) => d.tipo == despesa.tipo) 
        }
        //descricao
        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter((d) => d.descricao == despesa.descricao) 
        }
        //valor
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter((d) => d.valor == despesa.valor) 
        }
        return despesasFiltradas;
    }
    remover(id) {
        localStorage.removeItem(id)
    }
    somarValores() {
        let despesas = this.recuperarTodosRegistros();
        let total = 0;
        despesas.forEach((item) => {
            total += Number(item.valor)
        })
        const spanDespesa = document.querySelector('#totalDespesa')
        spanDespesa.innerHTML = 'R$ ' + total
    }
}
let bd = new Bd();

function modalSuccess() {
    modal.classList.add('ativo');
    h1modal.innerText = 'Registro inserido com sucesso'
    h1modal.style.color = 'green'
    pmodal.innerText = 'Despesa foi cadastrada com sucesso!'
    btnModal.style.background = 'green'
    btnModal.innerText = 'Voltar'

    dia.value = '';
    mes.value = '';
    ano.value = '';
    tipo.value = '';
    descricao.value = '';
    valor.value = '';
}
function modalErro() {
    modal.classList.add('ativo');
    h1modal.innerText = 'Erro na gravação'
    h1modal.style.color = 'red'
    pmodal.innerText = 'Existem campos obrigatórios que não foram preenchidos'
    btnModal.style.background = '#DC3545'
    btnModal.innerText = 'Voltar e corrigir'
}

function handleClick() { 
    let despesa = new Despesa (   
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value 
    ) 
    
    btnModal.addEventListener('click', () => {
        modal.classList.remove('ativo');
    })
    if(despesa.validarDados()) {
        bd.gravar(despesa)
        //success
        modalSuccess();
    }else {
        modalErro();
        //erro
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
    
    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros();
    }

    const listaDespesas = document.querySelector('#listaDespesas');
    listaDespesas.innerHTML = '';

    despesas.forEach((d) => {
        //craindo linhda (tr)
        let linha = listaDespesas.insertRow()
        
        //crinado as colunas (td)
        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
        //ajuste de tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break;
            case '2': d.tipo = 'Educação'
                break;
            case '3': d.tipo = 'Lazer'
                break;
            case '4': d.tipo = 'Saúde'
                break;
            case '5': d.tipo = 'Transporte'
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //botao de Exclusão de despesa
        const botaoexclusao = document.createElement('button');
        botaoexclusao.innerHTML = '<i class="fa-solid fa-xmark fa-lg" style="color: #ffffff;"></i>'
        botaoexclusao.classList.add('botao-e')
        botaoexclusao.id = 'id_despesa_' + d.id
        botaoexclusao.addEventListener('click', removerDespesa);
        linha.insertCell(4).append(botaoexclusao)

        function removerDespesa() {
            let idlimpo = this.id.replace('id_despesa_', '');
            bd.remover(idlimpo)
            window.location.reload();
        }
    })
    bd.somarValores();
}

function pesquisarDespesa() {
    //pega formulario e cria nova despesa passando para o metodo bd.pesquisar
    let valordia = dia.value;
    let valormes = mes.value;
    let valorano = ano.value;
    let valortipo = tipo.value;
    let valordescricao = descricao.value;
    let valorvalue = valor.value;

    let despesa = new Despesa(valorano, valormes, valordia, valortipo, valordescricao, valorvalue)

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}