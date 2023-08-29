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
}
let bd = new Bd();

function modalSuccess() {
    modal.classList.add('ativo');
    h1modal.innerText = 'Registro inserido com sucesso'
    h1modal.style.color = 'green'
    pmodal.innerText = 'Despesa foi cadastrada com sucesso!'
    btnModal.style.background = 'green'
    btnModal.innerText = 'Voltar'
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
        //bd.gravar(despesa)
        //success
        modalSuccess();
    }else {
        modalErro();
        //erro
    }
}