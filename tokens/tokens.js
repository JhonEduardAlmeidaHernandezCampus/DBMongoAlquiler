import 'reflect-metadata';
import { plainToClass, classToPlain } from 'class-transformer';
import dotenv from 'dotenv';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';

import { Alquiler } from '../routes/controller/alquiler.js'
import { Automovil } from '../routes/controller/automovil.js'
import { Cliente } from '../routes/controller/cliente.js'
import { Empleado } from '../routes/controller/empleado.js'
import { Registro_Devolucion } from '../routes/controller/registro_devolucion.js'
import { Registro_Entrega } from '../routes/controller/registro_entrega.js'
import { Reserva } from '../routes/controller/reserva.js'
import { Sucursal_Automovil } from '../routes/controller/sucursal_automovil.js'
import { Sucursal } from '../routes/controller/sucursal.js'

dotenv.config("../");
const generarToken = Router();
const validarToken = Router();

const Estructura = (Clases) => {
    const instanceClases = {
        'alquiler': Alquiler,
        'automovil': Automovil,
        'cliente': Cliente,
        'empleado': Empleado,
        'registro_devolucion': Registro_Devolucion,
        'registro_entrega': Registro_Entrega,
        'reserva': Reserva,
        'sucursal_automovil': Sucursal_Automovil,
        'sucursal': Sucursal,
    }

    const respuesta = instanceClases[Clases];
    if(!respuesta) throw {status: 404, message: "Error! Token solicitado no valido"}
    return { atributos: plainToClass(respuesta, {}, {ignoreDecorators: true}), class: respuesta}
}

generarToken.post("/:clase", async(req, res) => {
    try {
        let insta = Estructura(req.params.clase).atributos;
        const encoder = new TextEncoder();
        const jwtConstructor = new SignJWT(Object.assign({}, classToPlain(insta)));
        const jwt = await jwtConstructor
        .setProtectedHeader({alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30h")
        .sign(encoder.encode(process.env.JWT_KEY))

        res.send({status: 201, message: jwt})

    } catch (error) {
        res.status(error.status).send(error)
    }
})

validarToken.use("/", async(req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.send({status: 400, message: "Token no enviado"})
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_KEY)
        );
        req.data = jwtData;
        next();

    } catch (error) {
        res.send({status: 498, message: "Token caducado"})
    }
})

export {
    generarToken, 
    validarToken,
    Estructura
}