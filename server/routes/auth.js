'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Sequelize = require('sequelize');

module.exports = [
    {
        method: 'POST',
        path: '/api/login',
        handler: async (request, h) => {
            const user = await request.getModel('users').findOne({
                where: {
                    username: {
                        [Sequelize.Op.eq]: request.payload.username
                    }
                }
            });

            if (user) {
                const isValid = await bcrypt.compare(request.payload.password, user.password);
                if (isValid) {
                    const session = await request.getModel('sessions').create({
                        userId: user.id
                    });
                    const token = await JWT.sign({
                        session_id: session.id,
                        user_id: user.id,
                        expiry: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                        admin: user.admin
                    }, process.env.APP_KEY || 'asdf');

                    return h.response({ token: token });
                } else {
                    return h.response({ message: 'Invalid username or password.' }).code(401);
                }
            } else {
                return h.response({ message: 'Invalid username or password.' }).code(401);
            }
        },
        options: {
            validate: {
                options: {
                    stripUnknown: true
                },
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/logout',
        handler: (request, h) => {
            if (request.auth.credentials) {
                request.getModel('sessions').findById(request.auth.credentials.session_id, (session) => {
                    if (session) {
                        session.destroy();
                        return h.response().code(204);
                    }
                });
            }
        }
    }
];