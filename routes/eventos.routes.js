const EventosController = require('../controllers/eventos.controller');


module.exports = function(app) {
    app.post('/crear', EventosController.crearEvento);
    app.get('/', EventosController.obtenerEventos);
}
