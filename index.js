import express from 'express';
import eloadok from './routes/eloadok.js'

const app = express();
const port = 3000;

app.use('/eloadok',eloadok);

app.listen(3000, () => {
  console.log('Szerver fut: http://localhost:3000')
})