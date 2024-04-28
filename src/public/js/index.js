const socket = io()

socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO')
})

socket.on('newProduct', (product) => {
    console.log('Nuevo producto agregado:', product)
    const productList = document.getElementById('productList')
    const productItem = createProductItem(product)
    console.log(productList)
    console.log(productItem)
    productList.appendChild(productItem)
})
  
socket.on('deleteProduct', (pid) => {
    console.log('Producto eliminado:', pid)
    const productList = document.getElementById('productList')
    const productItem = document.getElementById(`product-${pid}`)
    if (productItem) {
        productList.removeChild(productItem)
    }
})

function createProductItem(product) {
    const productItem = document.createElement('div')
    productItem.id = `product-${product.id}`
    productItem.innerHTML = `
        <h3>Title: ${product.title}</h3>
        <img src="${product.thumbnail}" alt="${product.title}">
        <p>Id: ${product.id}</p>
        <p>Description: ${product.description}</p>
        <p>Category: ${product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Code: ${product.code}</p>
        <p>Stock: ${product.stock}</p>
    `
    return productItem
}