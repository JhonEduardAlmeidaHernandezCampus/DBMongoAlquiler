import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { Estructura } from '../tokens/tokens.js';
import { Cliente } from '../routes/controller/cliente.js';
import { Router } from 'express';

const validarEstructura = Router();
const validarData = Router();

validarEstructura.use((req, res, next) => {
    if(!req.rateLimit) return;

    let { payload } = req.data;
    const { iat, exp, ...newPayload} = payload;
    payload = newPayload;

    let clon = JSON.stringify( classToPlain( plainToClass( Estructura("cliente").class, {}, { ignoreDecorators: true})));
    let verificar = clon === JSON.stringify(payload);

    req.data = undefined;

    (!verificar) ? res.send({status: 406, message: "Autorización fallida"}) : next();
})

validarData.use( async(req, res, next) => {
    try {

        let data = plainToClass(Cliente, req.body);
        await validate(data)
        
        req.body = JSON.parse(JSON.stringify(data))
        req.data = undefined;
        
        next();
        
    } catch (error) {
        res.send(error)
    }
})

export {
    validarEstructura, 
    validarData
}