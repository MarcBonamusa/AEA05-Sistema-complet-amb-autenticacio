import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));

const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 4));

const getLoggedInUser = (req) => {
    return { name: req.session.user?.name || "Convidat" }; 
};

router.get('/', (req, res) => {
    const data = readData();
    const user = getLoggedInUser(req);
    
    const htmlMessage = `<p>Consulta la <strong>classificació</strong> actual de La Lliga.</p>
                         <a href="/">Home</a>`;
                         
    res.render("laliga", { user, data, htmlMessage }); 
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    
    const equip = data.laliga.find(e => e.id === id); 
    
    if (!equip) return res.status(404).send('Equip no trobat');
    
    res.json(equip);
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
    res.json({ message: "Equip actualitzat correctament" });
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