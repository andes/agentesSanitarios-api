// !!!!!!!! ATENCIÓN !!!!!!!!
// Todas los datos privados (credenciales, IPs, ...) deben quedar en el archivo config.private.ts
// !!!!!!!!!!!!!!!!!!!!!!!!!!

import { Auth } from './auth/auth.class';

const appMiddleware = [
    Auth.authenticate(),
    // Auth.deniedPatients()
];

const mobileMiddleware = [
    Auth.authenticate()
];

/*
const publicMiddleware = [
    Auth.authenticatePublic()
];
*/


// Habilita/deshabilita módulos de la API
export const modules = {
    auth: {
        active: true,
        path: './auth/routes',
        route: '/auth'
    },
    status: {
        active: true,
        path: './core/status/routes',
        route: '/core/status',
        middleware: null, // Son APIs públicas
    },
    rondasSanitariasApp: {
        active: true,
        path: './modules/rondasSanitariasApp/routes',
        route: '/modules/rondasSanitariasApp',
        middleware: mobileMiddleware
    }
};
