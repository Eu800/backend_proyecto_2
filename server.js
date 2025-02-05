const express = require('express');
const bodyParser = require('body-parser');
const conectarBaseDatos = require('./config/config');
const admin = require('firebase-admin'); //esto srive para cualquiera de los servicios de firebase

const app = express();
const PORT = 8000;

// Configuración de Firebase Admin SDK

const serviceAccount = require('./nanec2-firebase-adminsdk-ex1gf-496668c72b.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Conectar a la base de datos
conectarBaseDatos();

app.use(bodyParser.json());

// Rutas
const eventosRutas = require('./routes/eventos.routes');
const usuariosRutas = require('./routes/usuarios.routes');

eventosRutas(app);
usuariosRutas(app);
//server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
