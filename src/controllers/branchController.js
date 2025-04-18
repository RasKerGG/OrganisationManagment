const { Branch } = require("../models");

exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addBranch = async (req, res) => {
    try {
        await Branch.create({
            name: req.body.name,
            parentId: req.body.parent_id,
        })
        res.status(201).send('Запрос выполнен успешно');
    }
     catch (err) {
        res.status(500).send(err.message);
    }
}