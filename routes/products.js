import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

router.get('/', (req, res) => {
    const user = { name: "Francesc" };
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
                         <a href="/">Home</a>`;
    const data = readData();
    res.render("products", { user, data, htmlMessage });
});
router.get('/editProducte/:id', (req, res) => {
    const user = { name: "Francesc" };
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="/products">Llistat de productes</a>`;
    
    const data = readData();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) return res.status(404).send('Product not found');

    res.render("edit_product", { user, product, htmlMessage });
});

router.get('/:id', (req, res) => {
    const user = { name: "Francesc" };
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
                         <a href="/products">Llistat de productes</a>`;
    const data = readData();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.render("product", { user, product, htmlMessage });
});

router.post('/', (req, res) => {
    const data = readData();
    const { name, price, category } = req.body;
    if (!name || !price || !category) return res.status(400).send('All fields are required');
    const newProduct = { id: data.products.length + 1, name, price, category };
    data.products.push(newProduct);
    writeData(data);
    res.json(newProduct);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const productIndex = data.products.findIndex(p => p.id === id);
    if (productIndex === -1) return res.status(404).send('Product not found');
    data.products[productIndex] = { ...data.products[productIndex], ...req.body };
    writeData(data);
    res.redirect('/products');
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const productIndex = data.products.findIndex(p => p.id === id);
    if (productIndex === -1) return res.status(404).send('Product not found');
    data.products.splice(productIndex, 1);
    writeData(data);
    res.json({ message: 'Product deleted successfully' });
});

export default router;
