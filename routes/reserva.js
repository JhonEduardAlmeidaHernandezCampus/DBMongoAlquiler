import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'
import { validarEstructura, validarData } from '../middleware/middlewareReserva.js'
import { validarParams } from '../middleware/validarID.js'

let storageReserva = Router()
let db = await con()

storageReserva.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("reserva");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de las reservas")
    }
})

/*
    {
        "ID": 1,
        "ID_Client": 1,
        "ID_Car": 1,
        "Date_Reservation": "2023-08-10",
        "Date_Start": "2023-08-11",
        "Date_End": "2023-08-31",
        "Status": "Activo"
    }
*/
storageReserva.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("reserva")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);

        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageReserva.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("reserva")
        let respuesta = await collection.updateOne (
            { ID_Reserva: id },
            { $set: req.body }
        )
                
        res.send({status: 200, message: "Registro actualizado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageReserva.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("reserva")
        let respuesta = await collection.deleteOne({ID_Reserva: id})

        res.send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

export default storageReserva;