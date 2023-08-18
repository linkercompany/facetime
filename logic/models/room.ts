import * as validators from '../validators/room'
import { validate } from '../helpers/validator'
import * as types from '../types/room'

import { WebSocket } from 'ws'

const wss: WebSocket[] = []

export function connect(params: types.connect) {
    params = validate(params, validators.connect) as types.connect
    const ws = params.websocket as WebSocket
    wss.push(ws)
}

export async function broadcast(params: types.broadcast) {
    params = validate(params, validators.broadcast) as types.broadcast

    const message = params.body.message || new Date().getTime()

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const results = await Promise.all(
        wss.map(async (ws) => {
            try {
                ws.send(message)
                await delay(0) // 0.5 saniye (500 ms) bekleyin
                return true
            } catch (e) {
                return false
            }
        })
    )

    return results
}
