import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config.js';
import { conectarBD } from './config/db.js';
import resenasPlatosRouter from './routers/resenas_platos.routes.js';
import resenasRestaurantesRouter from './routers/resenas_restaurantes.routes.js';
import categoriasPlatosRouter from './routers/categorias_platos.routes.js';
import categoriasRestaurantesRouter from './routers/categorias_restaurantes.routes.js';
import platosRouter from './routers/platos.routes.js';
import restaurantesRouter from './routers/restaurantes.routes.js';
import usuariosRouter from './routers/usuarios.routes.js';
import authenticationRouter from './routers/authentication.routes.js';
import semver from 'semver';
import swaggerUi from 'swagger-ui-express'; 
import swaggerSpec from './swagger.spec.js';
import routerRanking from './routers/ranking_avg.routes.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5502', 
    'http://localhost:5501', 
    'http://localhost:5500', 
    'http://localhost:5000', 
    'https://davisson-adriel.github.io/front_food', 
    'https://davisson-adriel.github.io'           
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`El origen ${origin} no está permitido por CORS.`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 100,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.'
});

app.use(limiter);

app.use('/resenas_platos', resenasPlatosRouter);
app.use('/resenas_restaurantes', resenasRestaurantesRouter);
app.use('/categorias_platos', categoriasPlatosRouter);
app.use('/categorias_restaurantes', categoriasRestaurantesRouter);
app.use('/platos', platosRouter);
app.use('/restaurantes', restaurantesRouter);
app.use('/usuarios', usuariosRouter);
app.use('/auth', authenticationRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ranking', routerRanking)

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Backend Activo" });
});

app.get("/version", (req, res) => {
    const clientVersion = req.query.v;

    if(!clientVersion){
        return res.status(400).json({error: "Se debe proporcionar una version"});
    }

    const parsed = semver.coerce(clientVersion)?.version;

    if(!parsed || !semver.valid(parsed)){
        return res.status(400).json({error: "La versión no es válida", verRecibida: clientVersion, ejemploValido: "1.2.3"})
    }

    const es_compatible = semver.satisfies(parsed, process.env.MIN_RANGE);

    if(es_compatible){
        res.status(200).json({
            message: `La versión ${parsed} es compatible`,
            verRecibida: parsed,
            requerido: process.env.MIN_RANGE,
        })
    }

    return res.status(426).json({
        error: `La version ${parsed} no es compatible con la aplicacion, necesita actualizacion`,
        apiVersion: process.env.APIVERSION,
        requerido: process.env.MIN_RANGE,
    })
});

conectarBD().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Backend escuchando en http://${process.env.HOST_NAME}:${process.env.PORT}`)
    })
})
