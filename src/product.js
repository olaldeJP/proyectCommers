
export class Product{

    constructor(title,description,price,thumbnail,code,stock){
      
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock=stock
    }

    toPojo(){
        const pojo = {
            id: this.id,
            title: this.title,
            price: this.price,
            description: this.description,
            thumbnail: this.thumbnail,
            stock: this.stock,
            code: this.code,
          };
          return pojo;  
    }
}
