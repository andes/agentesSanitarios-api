import { pacienteApp as PacienteApp } from '../schemas/pacienteApp';
import { Types } from 'mongoose';

export const expirationOffset = 1000 * 60 * 60 * 24;

export function generarCodigoVerificacion(onlyNumber = true) {
    let codigo = '';
    const length = 6;
    const caracteres = onlyNumber ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return codigo;
}

// /**
//  * Obtiene una cuenta desde un profesional
//  * @param profesional {profesionalSchema}
//  */
export function getAccountByProfesional(id) {
    return PacienteApp.findOne({ profesionalId: Types.ObjectId(id) });
}


// /**
//  * Crea un usuario de la app mobile a partir de un profesional
//  * @param profesional {profesionalSchema}
//  */
export function createUserFromProfesional(profesional) {
    const dataPacienteApp: any = {
        profesionalId: profesional.id,
        nombre: profesional.nombre,
        apellido: profesional.apellido,
        email: profesional.documento,
        password: generarCodigoVerificacion(),
        telefono: '',
        envioCodigoCount: 0,
        nacionalidad: 'Argentina',
        documento: profesional.documento,
        fechaNacimiento: profesional.fechaNacimiento,
        sexo: profesional.sexo,
        genero: profesional.genero,
        permisos: [],
        pacientes: []
    };

    const user = new PacienteApp(dataPacienteApp);

    return user.save();

}
