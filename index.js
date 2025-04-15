import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const server = app.listen(PORT, HOST, () => {
    try {
        console.log(`Listening on ${HOST}`);
    }
    catch (err){
        console.error(err);
    }
})
