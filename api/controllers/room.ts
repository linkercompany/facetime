import * as roomLogic from '../../logic/models/room'
import { ahandler } from '../../errors/handle'

import { formatter } from './returnFormat'

export class RoomController {
    @ahandler
    static async connect(ws: any, req: any) {
        console.log('connect')
        roomLogic.connect({
            query: req.query,
            websocket: ws
        })
    }

    @ahandler
    static async broadcast(req: any, res: any) {
        const wss = roomLogic.broadcast({
            body: req.body
        })
        res.json(formatter(wss, 'facetime success'))
    }
}
