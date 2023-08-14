import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareAlquiler.js';
import {validarParams, validarParamsDate} from '../middleware/validarID.js';

let storageAlquiler = Router()
let db = await con()

storageAlquiler.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("alquiler");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los alquileres")
    }
})

/*
    {
        "ID": 1,
        "ID_Client": 1,
        "ID_Car": 1,
        "Date_Start":  "2023-08-12",
        "Date_End":  "2023-08-12",
        "Daily_Price": 100000,
        "Status": "Activo"
    }
*/
storageAlquiler.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("alquiler")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);

        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageAlquiler.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("alquiler")
        let respuesta = await collection.updateOne(
            { _ID_Alquiler: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})


storageAlquiler.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("alquiler")
        let respuesta = await collection.deleteOne({ _ID_Alquiler: id })

        res.send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

// Consultas -----------------------------------------------------------------------------------------------

// 6. Obtener los detalles del alquiler con el ID_Alquiler específico. 
// http://127.10.10.10:5500/alquiler/id/2 
storageAlquiler.get("/id/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let tabla = db.collection("alquiler");
        let data = await tabla.aggregate([
            {
                $match: {
                    _ID_Alquiler: id
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 402, message: "Error al generar la consulta"})
    }
})

// 9. Obtener el costo total de un alquiler específico. 
// http://127.10.10.10:5500/alquiler/costo_alquiler/4
storageAlquiler.get("/costo_alquiler/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {
        let id = req.params
        id = parseInt(id)

        let tabla = db.collection("alquiler");
        let data = await tabla.aggregate([
            {
                $match: {
                    _ID_Alquiler: id
                }
            },
            {
                $project: {
                    _id: 0,
                    Costo_Total: 1,
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 402, message: "Error al generar la consulta"})
    }
})

// 12. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'. 
// http://127.10.10.10:5500/alquiler/fecha_inicio/2023-07-05
storageAlquiler.get("/fecha_inicio/:ID", configGET(), validarEstructura, validarParamsDate, async(req, res) => {
    try {

        let id = req.params

        let tabla = db.collection("alquiler");
        let data = await tabla.aggregate([
            {
                $match: {
                    Fecha_Inicio: id
                }
            },
            {
                $project: {
                    _id: 0,
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.send({status: 402, message: "Error al generar la consulta"})
    }
})

// 18. Obtener la cantidad total de alquileres registrados en la base de datos.
storageAlquiler.get("/total", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("alquiler");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.send({status: 402, message: "Error al generar la consulta"})
    }
})

// 21. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'. 
// http://127.10.10.10:5500/alquiler/fecha_entre
storageAlquiler.get("/fecha_entre", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("alquiler");
        let data = await tabla.aggregate([
            {
                $match: {
                    Fecha_Inicio: {$gte: "2023-08-01", $lte: "2023-08-10"}
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 402, message: "Error al generar la consulta"})
    }
})

// ------------------------------------------------------------------------------------------------------------------

export default storageAlquiler;