import * as express from 'express';
import { ReporteSociosanitario } from '../schemas/reporteSociosanitario';

const router = express.Router();

router.get('/reporteSociosanitario/:id*?', (req, res, next) => {
    if (req.params.id) {
        ReporteSociosanitario.findById(req.params.id, (err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    } else {
        let query;
        query = ReporteSociosanitario.find({}); // Trae todos

        query.exec((err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    }
});

router.post('/reporteSociosanitario', (req, res, next) => {
    const insertreporteSociosanitario = new ReporteSociosanitario(req.body);

    // Debe ir antes del save, y ser una instancia del modelo
    insertreporteSociosanitario.save((errOnInsert) => {
        if (errOnInsert) {
            return next(errOnInsert);
        }
        res.json(insertreporteSociosanitario);
    });
});

router.put('/reporteSociosanitario/:id', (req, res, next) => {

    const updatereporteSociosanitario = new ReporteSociosanitario(req.body);

    updatereporteSociosanitario.isNew = false;
    updatereporteSociosanitario.save((errOnUpdate) => {
        if (errOnUpdate) {
            return next(errOnUpdate);
        }
        res.json(updatereporteSociosanitario);
    });
});

export = router;
