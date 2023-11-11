import fs from 'fs'
import {Product} from './product.js'


let id=1
function generarId() {
    return id++
  }
  
  
  export class  ProductManager {
    #ruta
    #arrayProcutos
 

    constructor(ruta)
    {   
        this.#ruta=`../dataBase/${ruta}`
        if(fs.existsSync(this.#ruta)){
            this.#arrayProcutos=JSON.parse(fs.readFileSync(this.#ruta))
        }else{
            this.#arrayProcutos=[]
            fs.writeFileSync(this.#ruta,JSON.stringify(this.#arrayProcutos))
        }
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
                if(this.#validarCampos(newProduct)){
                    if(this.#validarCodigo(newProduct.code)){
                        newProduct.id=generarId()
                        this.#arrayProcutos.push(newProduct)
                
                         await fs.promises.writeFile(this.#ruta,JSON.stringify(this.#arrayProcutos,null,2))
                        console.log('Producto agregado exitosamennte')
                        return newProduct
                        
                    }else{
                        console.log('Ya existe un producto con el mismo codigo')
                        return false
                    }
                }
            
               
        }
          
    
            
    

    async getProducts(){
       
            return [...this.#arrayProcutos]

    }
    
    
    async getProductById(id){
        try{ 
            this.#arrayProcutos=JSON.parse(await fs.promises.readFile(this.#ruta,'utf-8'))}
        catch{
            console.log('Error Al Leer Archivo')
        }
    
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
       
        
        const newArray=this.#arrayProcutos.filter(product => product.id !== id)
        await fs.promises.writeFile(this.#ruta,JSON.stringify(newArray),null,2)
        this.#arrayProcutos=newArray
    }
    
    
   async updateProduct(id,campo,nuevoValor){
        
    
        if(this.#arrayProcutos && (campo==='title'|| campo==='description' ||  campo==='price' || campo==='code'  || campo==='thumbnail' || campo==='stock'))
        {  
        
            for (let i=0 ; this.#arrayProcutos.length ; i++){
           
            if(this.#arrayProcutos[i].id===id){
          
                this.#arrayProcutos[i][campo]=nuevoValor
                
                console.log( this.#arrayProcutos[i][campo])
                break
            }
        }
          
        
         try{
            await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#arrayProcutos),null,2)
     
         }catch(error){
           
            throw new Error('OPERACION INVALIDA')
         }
     
    }
    }
}

   

/*
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
    code: '1',
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

*/