const express = require('express');
const {sequelize} = require("./db");
const session = require('express-session');
const app = express();
require('dotenv').config();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./public'));
app.use(methodOverride('_method'));
// Настройка сессии
app.use(session({
    secret: 'your-secret-key', // Замените на свой секретный ключ
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Для работы без HTTPS
}));

// Middleware для передачи настроек в шаблоны
app.use((req, res, next) => {
    res.locals.currentSettings = req.session.settings || {
        font: 'Arial',
        theme: 'light',
        primaryColor: '#007bff'
    };
    next();
});



app.use(express.urlencoded({ extended: true })); // Для данных форм
app.use(express.json());

app.use('/api/branches', require('./src/routes/branchesAPI'));
app.use('/api/employees', require('./src/routes/employeesAPI'));
app.use('/api/positions', require('./src/routes/positions'));


app.use('/', require('./src/routes/index'));
app.use('/certificate', require('./src/routes/certificate'));
app.use('/settings', require('./src/routes/settings'));
app.use('/employees', require('./src/routes/employees'));
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
