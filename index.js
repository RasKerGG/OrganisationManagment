const express = require('express');
const {Sequelize} = require("sequelize");
const {sequelize} = require("./db");
const path = require("path");

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
console.log(app.get('views'))

app.use(express.json());
app.use('/api/branches', require('./src/routes/branches'));
app.use('/api/employees', require('./src/routes/employees'));
app.use('/api/positions', require('./src/routes/positions'));

const server = app.listen(PORT, HOST, () => {
    try {
        sequelize.authenticate().then(() => {
            console.log('Подключено к базе данных');
        })
            .catch(err => {
                console.error('Ошибка подключения к базе данных:', err);
            });
        console.log(`Работает на адресе ${HOST}:${PORT}`);
    }
    catch (err){
        console.error(err);
    }
})
