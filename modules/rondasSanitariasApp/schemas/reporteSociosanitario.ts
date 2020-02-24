// import { AuditPlugin } from '@andes/mongoose-plugin-audit';
import * as mongoose from 'mongoose';

// Exportar Schema
export let ReporteSociosanitarioSchema = new mongoose.Schema({
    idReporte: {
        type: String
    }
});
// Habilitar plugin de auditoría

// reporteSociosanitarioSchema.index({ 'xxx': 1 });
// ReporteSociosanitarioSchema.plugin(AuditPlugin);
// Exportar Model
export let ReporteSociosanitario = mongoose.model('reporteSociosanitario', ReporteSociosanitarioSchema, 'reporteSociosanitario');
