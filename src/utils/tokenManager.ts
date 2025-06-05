import axios from 'axios';
import { config } from '../config/env';


let access_token: string | null = null;
let token_expires_At = 0;

export async function getAccessToken(): Promise<string> {

    try {
        const now = Date.now();

        if(access_token && token_expires_At > now ) return access_token;
    
        const { data} = await axios.post("https://id.twitch.tv/oauth2/token", null, {
            params: {
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: "client_credentials"
            }
        });

        return data.access_token

    } catch (e) {
        console.log('error al obtener el token ', e)
        return "";
    }
    
}