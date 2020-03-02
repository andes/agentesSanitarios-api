import { AndesCache, ObjectId } from '@andes/core';
import { RedisWebSockets } from '../config.private';
import { AuthUsers } from './schemas/authUsers';
import { profesional } from './../core/tm/schemas/profesional';


export let AuthCache: AndesCache;

if (RedisWebSockets.active) {
    AuthCache = new AndesCache({ adapter: 'redis', port: RedisWebSockets.port, host: RedisWebSockets.host });
} else {
    AuthCache = new AndesCache({ adapter: 'memory' });
}

/**
 * Genera los datos de sesion de un usuarios.
 * Son los que antes viajaban en el token.
 */

export function createPayload(user, authOrg, prof) {
    const nombre = (prof && prof.nombre) || user.nombre;
    const apellido = (prof && prof.apellido) || user.apellido;
    return {
        usuario: {
            id: user._id,
            nombreCompleto: nombre + ' ' + apellido,
            nombre,
            apellido,
            username: user.usuario,
            documento: user.usuario
        },
        organizacion: {
            _id: authOrg._id,
            id: authOrg._id,
            nombre: authOrg.nombre
        },
        profesional: prof && prof._id,
        permisos: [...user.permisosGlobales, ...authOrg.permisos]
    };
}

/**
 * Recupera los datos necesarios de un Usuario.
 * User y Profesional
 */

export async function findUser(username) {
    const pAuth = AuthUsers.findOne({ usuario: username });
    const pProfesional = profesional.findOne({ documento: username }, { matriculas: true, especialidad: true });
    const [auth, prof] = await Promise.all([pAuth, pProfesional]);
    if (auth) {
        return {
            user: auth,
            profesional: prof
        };
    }
    return null;
}


export async function updateUser(documento, nombre, apellido, password) {
    return await AuthUsers.findOneAndUpdate(
        { usuario: documento },
        { password, nombre, apellido, lastLogin: new Date() },
    );
}

// Función interna que chequea si la cuenta mobile existe
export const checkMobile = (profesionalId) => {
    return new Promise((resolve, reject) => {
        const authMobile = require('../modules/rondasSanitariasApp/controller/AuthController');
        authMobile.getAccountByProfesional(profesionalId).then((account) => {
            if (!account) {

                profesional.findById(profesionalId).then(prof => {
                    if (!prof) {
                        return reject();
                    }
                    authMobile.createUserFromProfesional(prof).then((account2) => {
                        resolve(account2);
                    }).catch(reject);
                });
            }
            resolve(account);
        }).catch(() => {
            reject();
        });
    });
};

/**
 * Recupera los datos extras del TOKEN. Utiliza la cache para rápido acceso.
 */

export async function getTokenPayload(token, userData) {
    return '';
}
