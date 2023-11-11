import { ProductManager } from "./productManager.js";
import { Product } from "./product.js";
import express from 'express';

const app = express();
const pm= new ProductManager('productsDB.json')

app.use(express.urlencoded( {extended :true }))


app.get('/', (req, res) => {
    res.send('Se Creo la Base de datos')
});

app.get('/agregar',async (req,res)=>{

    const producto=new Product('Titulo1','Descripcion 1',20,'unThumbnail',3,10)
   
    pm.addProduct(producto)
    console.log(await pm.getProducts())
    res.send(producto)
})

app.listen(8080,()=>{
    console.log('Servidor Funcionando')
})


