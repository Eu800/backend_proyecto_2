const UsuarioController = require('../controllers/usuarios.controller');

module.exports = function(app) {
    app.post('/registrar', UsuarioController.registrarUsuario);
    app.post('/rechazar', UsuarioController.eliminarSuscripcion);
}
