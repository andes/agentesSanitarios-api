import * as express from 'express';
import { Auth } from './../auth.class';

import { checkPassword } from '../ldap.controller';
import { findUser, updateUser, checkMobile } from '../auth.controller';

const sha1Hash = require('sha1');
const router = express.Router();


/**
 * Obtiene el user de la session
 * @get /api/auth/sesion
 */

router.get('/session', Auth.authenticate(), (req, res) => {
    res.json((req as any).user);
});

router.post('/login', async (req, res, next) => {
    // Función interna que genera token
    const login = async (user, prof) => {
        await updateUser(user.usuario, user.nombre, user.apellido, user.password);
        if (req.body.mobile) {
            if (prof && prof._id) {
                checkMobile(prof._id).then((account: any) => {
                    return res.json({
                        token: Auth.generateUserToken(user, null, [], prof, account._id),
                        user: account
                    });
                }).catch((e) => {
                    return next(403);
                });
            } else {
                return next(403);
            }
        } else {
            res.json({
                // token: Auth.generateUserToken2(user.usuario)
            });
        }
    };

    if (!req.body.usuario || !req.body.password) {
        return next(403);
    }

    try {
        const userResponse = await findUser(req.body.usuario);
        if (userResponse) {
            const { user, profesional }: any = userResponse;
            switch (user.authMethod || 'password') {
                case 'ldap':
                    const ldapUser = await checkPassword(user, req.body.password);
                    if (ldapUser) {
                        user.nombre = ldapUser.nombre;
                        user.apellido = ldapUser.apellido;
                        user.password = sha1Hash(req.body.password);
                        return login(user, profesional);
                    } else {
                        return next(403);
                    }
                case 'password':
                    const passwordSha1 = sha1Hash(req.body.password);
                    if (passwordSha1 === user.password) {
                        return login(user, profesional);
                    }
                    break;
            }
        }
        return next(403);
    } catch (error) {
        return next(403);
    }
});

/**
 * Refresca el token de un usuario
 * @param {string} token token de la cuenta
 * @post /api/auth/refreshToken
 * SE USA EN APP MOBILE
 */
router.post('/refreshToken', Auth.authenticate(), async (req, res, next) => {
    try {
        const oldToken: string = req.body.token;
        const usuario = (req as any).user.usuario;
        usuario['usuario'] = usuario.username;
        usuario['_id'] = usuario.id;
        const organizacion = req.body.organizacion ? req.body.organizacion : null;
        let refreshToken = Auth.refreshToken(oldToken, usuario, [], organizacion);
        if (refreshToken) {
            return res.json({
                token: refreshToken
            });
        } else {
            return next(403);
        }

    } catch (error) {
        return next(403);
    }
});
/**
 * Genera FileToken para poder acceder a archivos embebidos
 */

router.post('/file-token', Auth.authenticate(), (req, res, next) => {
    return res.json({ token: Auth.generateFileToken() });
});

export = router;
