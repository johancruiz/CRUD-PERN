import express from 'express';
import router from './routes/task.routes.js';
import cors from 'cors';

const app = express();

// Configurar el middleware de CORS correctamente
app.use(cors({
    origin: 'http://localhost:5173' // Permite solicitudes solo desde el frontend en localhost:5173
}));

app.use(express.json());
app.use(router);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
