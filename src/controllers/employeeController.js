const { Employee} = require("../models");
const {Op, Sequelize} = require("sequelize");

exports.getEmployees = async (req, res) => {

    try {
        const { sortBy = 'id', order = 'ASC' } = req.query;
        const validFields = ['id', 'fullName', 'joinDate', 'salary', 'branchId', 'positionId'];

        if (!validFields.includes(sortBy)) {
            return res.status(400).json({ error: 'Invalid sort field' });
        }

        const orderOptions = [];
        const [field] = sortBy.split('.');
        orderOptions.push([field, order]);

        const employees = await Employee.findAll({
            order: orderOptions,
        });

        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        res.status(500).send(error.message);
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send('Сотрудник удален успешно')
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

exports.getCertificate = async (req, res) => {
    try {
        const certificate = await Employee.findAll({
            where: {
                salary: {
                    [Op.lt]: 30000
                },
                join_date: {
                    [Op.lt]: Sequelize.literal(`CURRENT_DATE - INTERVAL '3 years'`)
                }
            }
        });
        res.json(certificate);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}