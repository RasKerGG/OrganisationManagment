const express = require('express');
const {sequelize} = require("./db");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./public'));


app.use(express.json());
app.use('/api/branches', require('./src/routes/branches'));
app.use('/api/employees', require('./src/routes/employees'));
app.use('/api/positions', require('./src/routes/positions'));
app.use('/', require('./src/routes/index'));

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
