import { Router } from 'express';
import { getStreamInfo } from '../api/twitch';
import { getSubscribers } from '../api/youtube';

const router = Router();


router.get("/", async (_req, res) =>{
    try {
        const stream = await getStreamInfo();
        res.json({
            live: !!stream,
            viewers: stream?.viewer_count || 0
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching Twitch data" });
    }
})


router.get("/youtube/", async (_req, res) => {

    try {
        const data = await getSubscribers()
        res.json(data)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching youtube data" });
    }
    
})


export default router;