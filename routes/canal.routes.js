const CanalController = require('../controllers/canal.controller');

module.exports = function(app) {
    app.get('/contar/:tipoSuscripcion', CanalController.contarUsuariosPorSuscripcion);
}