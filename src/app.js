const divF=document.querySelector(".divForm")
const crear=document.querySelector("#crear")
const eliminar=document.querySelector('#eliminar')
const buscar=document.querySelector('#buscar')
const agregar=document.querySelector('#agregar')
const mostrar=document.querySelector('#mostrar')

crear.addEventListener("click",()=>{
    agregar.disabled=false
    eliminar.disabled=false
    buscar.disabled=false
    agregar.disabled=false
    mostrar.disabled=false
})