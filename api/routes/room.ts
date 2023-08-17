import { RoomController } from '../controllers/room'

import { Router } from 'express'

export const router = Router()

router.ws('/connect', RoomController.connect)
router.post('/broadcast', RoomController.broadcast)
