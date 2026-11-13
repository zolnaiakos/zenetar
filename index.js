import express from 'express';
import eloadok from './routes/eloadok.js'
import albumok from './routes/albumok.js'
import mufajok from './routes/mufajok.js'
import statisztika from './routes/statisztika.js'
import orszagok from './routes/orszagok.js'



const app = express();
const port = 3000;

app.use('/eloadok',eloadok);
app.use('/albumok', albumok)
app.use('/mufajok', mufajok)
app.use('/statisztika', statisztika)
app.use('/orszagok', orszagok)

app.use((req, res) => {
    res.status(404).json({
        error: 'nem található a végpont'
    });
});

app.listen(3000, () => {
  console.log('Szerver fut: http://localhost:3000')
})