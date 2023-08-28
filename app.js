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
function handleClick() { 
    let despesa = new Despesa (   
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value 
    ) 
    gravar(despesa) 
} 
function gravar(d) { 
    localStorage.setItem('despesa', JSON.stringify(d)); 
}