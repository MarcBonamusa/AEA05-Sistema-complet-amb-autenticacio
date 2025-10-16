import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

router.get('/', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/">Home</a>`;
    const data = readData();
    res.render("golejadors", { user, data, htmlMessage });
});
router.get('/editProducte/:id', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/golejadors">Llistat de productes</a>`;
    
    const data = readData();
    const product = data.golejadors.find(p => p.id === parseInt(req.params.id));
    
    if (!product) return res.status(404).send('Product not found');

    res.render("edit_product", { user, product, htmlMessage });
});

router.get('/:id', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/golejadors">Llistat de productes</a>`;
    const data = readData();
    const product = data.golejadors.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.render("product", { user, product, htmlMessage });
});

router.post('/', (req, res) => {
    const data = readData();
    const { name, price, category } = req.body;
    if (!name || !price || !category) return res.status(400).send('All fields are required');
    const newProduct = { id: data.golejadors.length + 1, name, price, category };
    data.golejadors.push(newProduct);
    writeData(data);
    res.json(newProduct);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const productIndex = data.golejadors.findIndex(p => p.id === id);
    if (productIndex === -1) return res.status(404).send('Product not found');
    data.golejadors[productIndex] = { ...data.golejadors[productIndex], ...req.body };
    writeData(data);
    res.redirect('/golejadors');
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const productIndex = data.golejadors.findIndex(p => p.id === id);
    if (productIndex === -1) return res.status(404).send('Product not found');
    data.golejadors.splice(productIndex, 1);
    writeData(data);
    res.json({ message: 'Product deleted successfully' });
});

export default router;
