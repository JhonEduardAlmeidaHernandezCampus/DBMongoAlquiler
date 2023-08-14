import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareRegistroEntrega.js';
import { validarParams } from '../middleware/validarID.js';

let storageRegistroEntrega = Router()
let db = await con()

storageRegistroEntrega.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("registro_entrega");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los registros de entrega")
    }
})

/*
    {
        "ID": 1,
        "ID_Hire": 1,
        "ID_Employee": 1,
        "Date_Delivery": "2023-08-11",
        "Fuel_Delivery": "12 Galones - Gasolina",
        "Mileage_Delivery": 100
    }
*/
storageRegistroEntrega.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("registro_entrega")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);

        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageRegistroEntrega.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("registro_entrega")
        let respuesta = await collection.updateOne(
            { ID_Registro: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageRegistroEntrega.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("registro_entrega")
        let respuesta = await collection.deleteOne({ID_Registro: id})

        res.send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

export default storageRegistroEntrega;