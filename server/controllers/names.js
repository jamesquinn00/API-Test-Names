const express = require("express");
const router = express.Router();

const Name = require("../model/name");

router.get('/', (req,res)=>{
    const namesData = Name.all;
    res.send(namesData);
});

router.post('/', (req, res)=>{
    const data = req.body;
    const newName = Name.create(data);
    res.send({message: `${newName.fname} successfully added to our collection.`});
});

router.delete('/names/:id', (req, res) => {
    console.log("data.id: ", data.id)
    const delName = Name.Remove(data.id);
    console.log("REACHED HERE (ROUTER.JS)");
    res.send({message: `${delName.fname} successfully removed from our collection.`})
});

module.exports = router;