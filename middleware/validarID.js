import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validarID } from '../routes/controller/validarID.js';

const validarParams = (req, res, next) => {
    try {
        let parametros = plainToClass(validarID, req.params.ID, {excludeExtraneousValues: true});
        req.params = parametros;

        (isNaN(req.params)) ? res.send({status: 402, message: "Error en los parametros del Header"}) : next();
        
    } catch (error) {
        res.status(error.status).send(error)
    }
}

const validarParamsDate = (req, res, next) => {
    try {
        let parametros = plainToClass(validarID, req.params.ID, {excludeExtraneousValues: true});
        req.params = parametros;

        next();

    } catch (error) {
        res.status(error.status).send(error)
    }
}

export {
    validarParams,
    validarParamsDate
};