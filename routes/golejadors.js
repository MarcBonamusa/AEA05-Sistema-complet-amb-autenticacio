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
router.get('/edit_golejador/:pos', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/golejadors">Llistat de golejadors</a>`;
    
    const data = readData();
    const golejador = data.goleadores.find(p => p.pos === parseInt(req.params.pos));
    
    if (!golejador) return res.status(404).send('Golejador not found');

    res.render("edit_golejador", { user, golejador, htmlMessage });
});

router.get('/:pos', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/golejadors">Llistat de golejadors</a>`;
    const data = readData();
    const golejador = data.goleadores.find(p => p.pos === parseInt(req.params.pos));
    if (!golejador) return res.status(404).send('Golejador not found');
    res.render("golejador", { user, golejador, htmlMessage });
});

router.post('/', (req, res) => {
    const data = readData();
    const { name, price, category } = req.body;
    if (!name || !price || !category) return res.status(400).send('All fields are required');
    const newProduct = { id: data.goleadores.length + 1, name, price, category };
    data.goleadores.push(newProduct);
    writeData(data);
    res.json(newProduct);
});

router.put('/:pos', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    
    const golejadorIndex = data.goleadores.findIndex(e => e.id === id); 
    
    if (golejadorIndex === -1) return res.status(404).send('Jugador no trobat');
    
    data.goleadores[golejadorIndex] = { ...data.goleadores[golejadorIndex], ...req.body };
    writeData(data);
    res.redirect('/golejadors');
});

router.delete('/:pos', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.pos);
    const productIndex = data.goleadores.findIndex(p => p.pos === id);
    if (productIndex === -1) return res.status(404).send('Product not found');
    data.goleadores.splice(productIndex, 1);
    writeData(data);
    res.redirect('/golejadors')
});

export default router;
