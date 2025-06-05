import axios from 'axios';
import { Server as IOServer } from 'socket.io';
import { getAccessToken } from '../utils/tokenManager';


let cached_user_id: string | null = null;
let access_token: string | null = null;

async function getUserId(): Promise<string | null> {

    if (cached_user_id) return cached_user_id;

    access_token = await getAccessToken();

    const {data} = await axios.get("https://api.twitch.tv/helix/users", {
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${access_token}`
        },
        params: { login: process.env.TWITCH_CHANNEL_NAME }
    });

    cached_user_id = data.data[0].id;
    return cached_user_id;
}

export async function getStreamInfo(io?:IOServer) {
    console.log('aqui llego ');
    const user_id = await getUserId();

    const { data } = await axios.get('https://api.twitch.tv/helix/streams', {
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${access_token}`
        },
        params: { user_id: user_id }
    });
    if (io) {
        io.emit('getStreamInfo', data.data[0]);
    }
    return data.data[0]
}

export async function getFollowerCount() {
    const user_id = await getUserId();

    const { data } = await axios.get('https://api.twitch.tv/helix/users/follows', {
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${access_token}`
        },
        params: { to_id: user_id }
    });

    console.log(data);

    return data;
}