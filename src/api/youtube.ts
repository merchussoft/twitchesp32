import axios from 'axios';
import { Server as IOServer } from 'socket.io';


async function connectYoutube() {
    const {data} = await axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics", {
        params: { 
            id: process.env.YOUTUBE_CHANNEL_ID, 
            key: process.env.YOUTUBE_API_KEY 
        }
    });

    return data.items[0].statistics;
}


export async function getSubscribers(io?:IOServer) {
    const data = await connectYoutube();
    if (io) io.emit('getSubscribers', data);
    return {subscriberCount: data.subscriberCount, viewCount: data.viewCount}
}