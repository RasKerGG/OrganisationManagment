const express = require('express');

const app = express();

const { Sequelize } = require('sequelize')

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.use(express.json());
app.use('/api/branches', require('./src/routes/branches'));
app.use('/api/employees', require('./src/routes/employees'));

const server = app.listen(PORT, HOST, () => {
    try {
        console.log(`Listening on ${HOST}`);
    }
    catch (err){
        console.error(err);
    }
})
