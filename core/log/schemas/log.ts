// import { mpi } from './../../../config';
import * as mongoose from 'mongoose';

/**
 * Descripcion Operaciones logs:
 * MPI:
 * scan == escaneo exitoso
 * scanFail == escaneo fallido
 * macheoAlto == Macheo con un % superior a 90
 * posibleDuplicado == Nuevo paciente, pero matchea con un porcentaje entre 80 y 90 con otro.
 * validadoScan == 'Paciente encontrado por el string del scan'
 *
 */

export let logSchema = new mongoose.Schema({
    fecha: {
        type: Date
    },
    usuario: {
        nombreCompleto: String,
        nombre: String,
        apellido: String,
        username: Number,
        documento: Number
    }
});

logSchema.index({ modulo: 1, operacion: 1 });

export let log = mongoose.model('log', logSchema, 'log');
