import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: false
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 100,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.'
});

app.use(limiter);



app.get("/health", (req, res) => {
    res.status(200).json({ message: "Backend Activo" });
});

conectarBD().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})