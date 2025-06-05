import { Server as HTTPServer } from 'http'; 
import { Server as IOServer, Socket } from "socket.io";
import { getStreamInfo } from '../api/twitch';
import { getSubscribers } from '../api/youtube';

export function initSocket(server: HTTPServer) {

    const io = new IOServer(server, {
        transports: ['websocket'],
        cors: {
            origin: '*',
          },
          pingInterval: 25000, // Ping cada 25 segundos
          pingTimeout: 60000,  // Timeout de 60 segundos
    });

    io.on('connection', ( socket:Socket)  => {
        console.log('🟢 Nuevo cliente conectado:', socket.id);

        socket.on('viewrsCountTwitch', async () => {
            try {
                getStreamInfo(io)
            } catch (error) {
                console.error("❌ Error conectando a twitch:", error);
            }
        })


        socket.on('getSubscribersYoutube', async (username: string) => {
            try {
                getSubscribers(io)
            } catch (error) {
                console.error("❌ Error conectando a twitch:", error);
            }
        })
    })
}

