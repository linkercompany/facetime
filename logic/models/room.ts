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

    wss.forEach((ws) => {
        ws.send(message)
    })

    return wss.length
}
