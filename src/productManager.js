import fs from 'fs/promises'
import {Product} from './product.js'


let id=1
function generarId() {
    return id++
  }
  
  
class ProductManager{
    #ruta
    #arrayProcutos=[]
 

    constructor(ruta)
    {
        this.#ruta=ruta
    }
    
    #validarCampos(product)
        {
            if(!product.title || !product.description || !product.price || !product.code  || !product.thumbnail || !product.stock || !(product.price>0)) {
                console.log('CAMPOS INVALIDOS')
                return false
            }else{
                return true
                    }
        } 
    #validarCodigo(codigo){
        
            const product=this.#arrayProcutos.find(product=> product.code === codigo)
            if ( product){ return false    }
           
            return true
    }
    
    async addProduct(newProduct)
        {       
               try{ 
                 this.#arrayProcutos=JSON.parse(await fs.readFile(this.#ruta,'utf-8'))
                 
                }
                catch(error){ 
                }
            
                if(this.#validarCampos(newProduct)){
                    if(this.#validarCodigo(newProduct.code)){
                        newProduct.id=generarId()
                        this.#arrayProcutos.push(newProduct)
                        await fs.writeFile(this.#ruta,JSON.stringify(this.#arrayProcutos,null,2))
                        console.log('Producto agregado exitosamennte')
                        return newProduct
                        
                    }else{
                        console.log('Ya existe un producto con el mismo codigo')
                        return false
                    }
                }
             
               
        }
          
    
            
    

    async getProducts(){
        const array=JSON.parse(await fs.readFile(this.#ruta,'utf-8'))
        return array
    }
    
    
    async getProductById(id){
        try{ this.#arrayProcutos=JSON.parse(await fs.readFile(this.#ruta,'utf-8',2))}
        catch{}
    
        let producto=this.#arrayProcutos.find((product) => product.id === id);
        if(!producto){
            console.log('No se encontro el producto con el ID')
            return false
        }
        else{
            
            return producto
        }
    }
 
    async deleteProductByID(id) {
        const array=JSON.parse(await fs.readFile(this.#ruta,'utf-8'))
        const newArray=array.filter(product => product.id !== id)
         await fs.writeFile(this.#ruta,JSON.stringify(newArray,null,2))
    }
    
    
   async updateProduct(id,campo,nuevoValor){
        
    
        
        let product= await this.getProductById(id); 
        
        if(product && (campo==='title'|| campo==='description' ||  campo==='price' || campo==='code'  || campo==='thumbnail' || campo==='stock'))
        { 
            this.#arrayProcutos=JSON.parse(await fs.readFile(this.#ruta,'utf-8'))    
            for (let i=0 ; this.#arrayProcutos.length ; i++){
           
            if(this.#arrayProcutos[i].id===id){
          
                this.#arrayProcutos[i][campo]=nuevoValor
                
                console.log( this.#arrayProcutos[i][campo])
                break
            }
        }
          
        
         try{
            await fs.writeFile(this.#ruta, JSON.stringify(this.#arrayProcutos,null,2))
     
         }catch(error){
           
            console.log('Operacion no valida')
         }
     
    }
    }
}

   


const p1 = {
    title: 'T1',
    description: 'D1',
    price: 5,
    thumbnail: '2',
    code: '5',
    stock: 5
}
const p2 = {
    title: 'T2',
    description: 'D2',
    price: 5,
    thumbnail: '2',
    code: '1',
    stock: 5
}
const p3 = {
    title: 'T3',
    description: 'D3',
    price: 3,
    thumbnail: '3',
    code: '3',
    stock: 5
}
const p4 = {
    title: 'T4',
    description: 'D1',
    price: 2,
    thumbnail: '2',
    code: '59',
    stock: 5
}


const pm=new ProductManager('dbProducts.JSON')

await pm.addProduct(p1)
await pm.addProduct(p2)
await pm.addProduct(p3)
await pm.addProduct(p4)


const p=await pm.getProductById(3)
await pm.deleteProductByID(2)
const array=await pm.getProducts()

await pm.updateProduct(3,'description','NuevoTitulo')
