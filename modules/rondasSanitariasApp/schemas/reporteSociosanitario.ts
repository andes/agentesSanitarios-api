// import { AuditPlugin } from '@andes/mongoose-plugin-audit';
import * as mongoose from 'mongoose';

// Exportar Schema
export let ReporteSociosanitarioSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.Mixed
    },
    hogar: {
        type: mongoose.Schema.Types.Mixed
    },
    vivienda: {
        type: mongoose.Schema.Types.Mixed
    },
    parcela: {
        type: mongoose.Schema.Types.Mixed
    }

});
// Habilitar plugin de auditoría

// reporteSociosanitarioSchema.index({ 'xxx': 1 });
// ReporteSociosanitarioSchema.plugin(AuditPlugin);
// Exportar Model
export let ReporteSociosanitario = mongoose.model('reporteSociosanitario', ReporteSociosanitarioSchema, 'reporteSociosanitario');
