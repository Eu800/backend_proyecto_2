const { Server } = require('socket.io');

let io;

function configurarWebSockets(server) {
    io = new Server(server, {
        cors: {
            origin: '*', 
        },
    });

    io.on('connection', (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    });
}

function notificarClientes(eventType, data) {
    if (io) {
        io.emit(eventType, data); 
    }
}

module.exports = { configurarWebSockets, notificarClientes };