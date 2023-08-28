const ano = document.querySelector('#ano'); 
const mes = document.querySelector('#mes'); 
const dia = document.querySelector('#dia'); 
const tipo = document.querySelector('#tipo'); 
const descricao = document.querySelector('#descricao'); 
const valor = document.querySelector('#valor'); 
const btn = document.querySelector('.btn'); 

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

function handleClick() { 
    let despesa = new Despesa (   
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value 
    ) 

    bd.gravar(despesa)
}