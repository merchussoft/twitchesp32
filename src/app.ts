import express from 'express';
import statusRouter from './routes/status';

const app = express();

app.set('port', process.env.PORT || 3000);


app.get('/', (_req, res) => {
    res.send("Twitch ESP32 API Running");
})

app.use('/status', statusRouter);


export default app;
