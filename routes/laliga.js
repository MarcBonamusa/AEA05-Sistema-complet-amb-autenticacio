import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'))
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 4));

router.get('/', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/">Home</a>`;
    const data = readData();
    res.render("laliga", { user, data, htmlMessage }); 
});

router.get('/edit_classificacio/:id', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/laliga">Llistat d'equips</a>`;
    
    const data = readData();

    const equip = data.laliga.find(e => e.id === parseInt(req.params.id));
    
    if (!equip) return res.status(404).send('Equip no trobat');

    res.render("edit_classificacio", { user, equip, htmlMessage }); 
});

router.get('/:id', (req, res) => {
    const user = { name: "Marc" };
    const htmlMessage = `<a href="/laliga">Llistat d'equips</a>`;
    const data = readData();
    const equip = data.laliga.find(e => e.id === parseInt(req.params.id));
    
    if (!equip) return res.status(404).send('Equip no trobat');

    res.render("equip", { user, equip, htmlMessage });
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    
    const newEquip = { 
        id: data.laliga.length > 0 ? data.laliga[data.laliga.length - 1].id + 1 : 1,
        ...body 
    };
    
    data.laliga.push(newEquip);
    writeData(data);
    res.json(newEquip);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    
    const equipIndex = data.laliga.findIndex(e => e.id === id); 
    
    if (equipIndex === -1) return res.status(404).send('Equip no trobat');
    
    data.laliga[equipIndex] = { ...data.laliga[equipIndex], ...req.body };
    writeData(data);
    res.redirect('/laliga');
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    
    const equipIndex = data.laliga.findIndex(e => e.id === id);
    
    if (equipIndex === -1) return res.status(404).send('Equip no trobat');
    
    data.laliga.splice(equipIndex, 1);
    writeData(data);
    res.json({ message: "Equip eliminat correctament" });
});

export default router;