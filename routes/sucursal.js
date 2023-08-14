import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareSucursal.js';
import { validarParams } from '../middleware/validarID.js';

let storageSucursal = Router()
let db = await con()

storageSucursal.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("sucursal");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de las sucursales")
    }
})

/* 
    {
        "ID": 1,
        "Name": "San autos",
        "Address": "Bucaramanga - Calle 18 # 12 - 45",
        "Phone": "+57 3002154875"
    }
*/
storageSucursal.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("sucursal")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);

        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageSucursal.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {
        
        let id = req.params
        id = parseInt(id)

        let collection = db.collection("sucursal")
        let respuesta = await collection.updateOne(
            { _ID_Sucursal: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageSucursal.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("sucursal")
        let respuesta = await collection.deleteOne({_ID_Sucursal: id})

        res.send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

export default storageSucursal;