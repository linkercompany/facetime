import Joi from 'joi'

export const connect = Joi.object({
    query: Joi.object({}),
    websocket: Joi.any()
})

export const broadcast = Joi.object({
    body: Joi.object({
        message: Joi.string()
    }).required()
})
