import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareSucursalAutomovil.js';
import { validarParams } from '../middleware/validarID.js';

let storageSucursalAutomovil = Router()
let db = await con()

storageSucursalAutomovil.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("sucursal_automovil");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de las sucursales de los automoviles")
    }
})

/*
    {
        "ID": 1,
        "ID_Car": 1,
        "Quantity_Available": 14
    }
*/
storageSucursalAutomovil.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("sucursal_automovil")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);

        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageSucursalAutomovil.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params;
        id = parseInt(id);

        let collection = db.collection("sucursal_automovil")
        let respuesta = await collection.updateOne( 
            { ID_Sucursal_ID_Sucursal: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageSucursalAutomovil.put("/:ID", async(req, res) => {
    try {

        let id = req.params;
        id = parseInt(id);

        let collection = db.collection("sucursal_automovil")
        let res = await collection.deleteOne({ID_Sucursal_ID_Sucursal: id})

        res.send({status: 200, message: "Registro eliminado con exito"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

export default storageSucursalAutomovil;