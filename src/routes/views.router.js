import express from 'express'
const router = express.Router()
import ProductManager from '../controllers/product.controller.js'
const manager = new ProductManager()
import { getIO } from "../app.js"

router.get('/', async(req, res) => {
    try {
        const productos = await manager.getProducts()
        res.render('home', { productos })
    } catch (error) {
        console.error('Error al obtener productos:', error)
        res.status(500).send('Error interno del servidor')
    }
})

router.get('/realtimeproducts', async(req, res) => {
    try {
        const productos = await manager.getProducts()
        res.render('realTimeProducts', { productos })
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error interno del servidor')
    }
})

router.post('/realtimeproducts', async(req, res) => {
    try {
        let {title, description, code, price, stock, category, thumbnail=[]} = req.body
        let newProduct = await manager.addProduct(title, description, code, price, stock, category, thumbnail=[])
        const socketServer = getIO()
        socketServer.emit('newProduct', newProduct.product)
        res.status(200).send({message : "Producto Agregado"})
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error interno del servidor')
    }
})



router.delete('/realtimeproducts/:pid', async(req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        await manager.deleteProduct(pid)
        const socketServer = getIO()
        socketServer.emit('deleteProduct', pid)
        res.status(200).send({message : "Producto Eliminado"})
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error interno del servidor')
    }
})


export default router