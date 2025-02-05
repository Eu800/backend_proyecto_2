const ReportesController = require('../controllers/reportes.controller');

module.exports = function(app) {
    app.post('/crear', ReportesController.crearReporte);
    app.get('/', ReportesController.obtenerReportes);
}
