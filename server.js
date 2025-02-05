const express = require('express');
const bodyParser = require('body-parser');
const conectarBaseDatos = require('./config/config');
const admin = require('firebase-admin'); //esto srive para cualquiera de los servicios de firebase

const app = express();
const PORT = 8000;

// Configuración de Firebase Admin SDK

const serviceAccount = require('./geoalerta-2af22-firebase-adminsdk-fbsvc-6c5cfc6fe4.json');
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
