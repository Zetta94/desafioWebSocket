import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


class ProductManager {
    constructor(){
        const currentFileUrl = import.meta.url;
        const currentFilePath = fileURLToPath(currentFileUrl);
        const currentDirPath = dirname(currentFilePath);
        this.path = join(currentDirPath, '..', 'products.json');
    }

    //Function creates a product and adds it to the product list.
    async addProduct(title, description, code, price, stock, category, thumbnail){
        try {
            let products = [];

            try {
                const data = await fs.readFile(this.path, 'utf8')
                if (data.trim() !== '') {
                    products = JSON.parse(data);
                }
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error('Error reading file:', error)
                }
            }
            
            const control_code = products.find(e => e.code === code)
            if (control_code) {
                throw new Error('A product with this code has already been entered')
            }else{
                const last_element = products[products.length-1]
                let id = 1
   
               if(last_element){
                   id = last_element.id + 1
               }

                const product = {
                    id : id,
                    title : title,
                    description : description,
                    code: code,
                    price : price,
                    status: true,
                    stock : stock,
                    category: category,
                    thumbnail: thumbnail
                };

                products.push(product);

                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                return {status:true, product:product};
            }

            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //Function that lists products.
    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            const product_list = products.filter(e => e.status === true);

            return product_list;
        } catch (error) {
            throw new Error (error);
        }
    }

    //Function that returns a product by its id.
    async getProductById(id) {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            const product_find = products.find(e => e.id === id);
            
            if (!product_find) {
                throw new Error("The product with that ID was not found.")
            } else {
                return product_find;
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    //Funcion that implements the logical erase of a product determined by its id.
    async deleteProduct(id) {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            let products = JSON.parse(data);
            const index = products.findIndex(e => e.id === id);
            if (index === -1) {
                throw new Error("Product not found")
            }
    
            // Eliminar el elemento del array
            products.splice(index, 1);
    
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }
    

    //!Controlar que si agregan un nuevo codigo este codigo ya no exista antes.
    //Function updates a product by its id and its field.
    async updateProduct(id, fieldToUpdate, newValue) {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            const products = JSON.parse(data);  
            const index = products.findIndex(e => e.id === id);
            
            if (index === -1) {
                throw new Error("Product not found");
            }
            
            if (fieldToUpdate === 'id') {
                throw new Error("Cannot update ID field");
            }
            
            if (!products[index].hasOwnProperty(fieldToUpdate)) {
                throw new Error("Field to update is not valid");
            }

            products[index][fieldToUpdate] = newValue;

            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error ('Error updating product:' + error.message);
        }
    }

}

export default ProductManager;
