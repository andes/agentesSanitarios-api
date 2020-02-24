import * as mongoose from 'mongoose';

const matriculacionSchema = new mongoose.Schema({
    matriculaNumero: { type: Number, required: false },
    libro: { type: String, required: false },
    folio: { type: String, required: false },
    inicio: Date,
    baja: {
        motivo: { type: String, required: false },
        fecha: { type: String, required: false }
    },
    notificacionVencimiento: { type: Boolean, required: false },
    fin: Date,
    revalidacionNumero: Number
});
export let profesionalSchema = new mongoose.Schema({
    nombre: { type: String, required: false },
    apellido: { type: String, required: false },
    tipoDocumento: { type: String, required: false },
    documento: { type: String, required: false },
    documentoVencimiento: { type: Date, required: false },
    cuit: { type: String, required: false },
    fechaNacimiento: { type: Date, required: false },
    lugarNacimiento: { type: String, required: false },
    fechaFallecimiento: { type: Date, required: false },
    sexo: { type: String, required: false },
});

// Virtuals
profesionalSchema.virtual('nombreCompleto').get(function () {
    return this.apellido + ', ' + this.nombre;

});
profesionalSchema.virtual('fallecido').get(function () {
    return this.fechaFallecimiento;
});

export let profesional = mongoose.model('profesional', profesionalSchema, 'profesional');
