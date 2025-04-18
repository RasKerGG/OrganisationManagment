const { Employee } = require("../models");

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    }
    catch (error) {
        console.log(error);
        req.status(500).send(error.message);
    }
}

exports.addEmployee = async (req, res) => {
    try {
        await Employee.create({
            fullName: req.body.fullName,
            joinDate: req.body.joinDate,
            branchId: req.body.branchId,
            position_id: req.body.position_id,
            salary: req.body.salary,
        });
        res.status(201).send('Запрос выполнен успешно')
    }
    catch (error) {
        console.log(error);
        req.status(500).send(error.message);
    }
}