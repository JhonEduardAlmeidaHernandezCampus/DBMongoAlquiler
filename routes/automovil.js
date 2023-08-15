import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareAutomovil.js';
import { validarParams } from '../middleware/validarID.js';

let storageAutomovil = Router()
let db = await con()

storageAutomovil.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los automoviles")
    }
})

/* 
    {
        "ID": 1,
        "Brand": "Chevrolet",
        "Model": "Spark",
        "Year": 2020,
        "Type": "Automatico",
        "Capacity": 5,
        "Daily_Price": 1000000
    }
*/
storageAutomovil.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("automovil")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        
        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageAutomovil.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("automovil")
        let respuesta = await collection.updateOne(
            { _ID_Automovil: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageAutomovil.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {
        let id  = req.params;
        id = parseInt(id)

        let collection = db.collection("automovil")
        let respuesta = await collection.deleteOne({_ID_Automovil: id})
        
        res.send({status: 200, message: "Registro eliminado con exito"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

// Consultas --------------------------------------------------------------------------------------------------------------------------------------------

// 3. Obtener todos los automóviles disponibles para alquiler.
// http://127.10.10.10:5500/automovil/disponibles_alquiler
storageAutomovil.get("/disponibles_alquiler", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.aggregate([
            {
                $lookup: {
                    from: "alquiler",
                    localField: "_ID_Automovil",
                    foreignField: "ID_Automovil_ID_Automovil",
                    as: "fk_automovil_alquiler"
                }
            },
            {
                $unwind: "$fk_automovil_alquiler"
            },
            {
                $match: {
                    "fk_automovil_alquiler.Estado": {$eq: "Activo"}
                }  
            },
            {
                $project: {
                    _id: 0,
                    _ID_Automovil: 1,
                    Marca: 1,
                    Modelo: 1,
                    Tipo: 1,
                    Capacidad: 1,
                    Precio_Diario: 1,
                    "fk_automovil_alquiler.Estado": 1
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 8. Mostrar la cantidad total de automóviles disponibles en cada sucursal.
// http://127.10.10.10:5500/automovil/cantidad_total
storageAutomovil.get("/cantidad_total", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.aggregate([
            {
                $lookup: {
                  from: "sucursal_automovil",
                  localField: "_ID_Automovil",
                  foreignField: "ID_Automovil_ID_Automovil",
                  as: "fk_automovil_sucursal_automovil"
                }
            },
            {
                $unwind: "$fk_automovil_sucursal_automovil"
            },
            {
                $lookup: {
                  from: "sucursal",
                  localField: "fk_automovil_sucursal_automovil.ID_Sucursal_ID_Sucursal",
                  foreignField: "_ID_Sucursal",
                  as: "fk_automovil_sucursal"
                }
            },
            {
                $unwind: "$fk_automovil_sucursal"
            },
            {
                $group: {
                    _id: "$_ID_Automovil",
                    _ID_Automovil: { $first: "$_ID_Automovil" },
                    Marca: { $first: "$Marca" },
                    Modelo: { $first: "$Modelo" },
                    Tipo: { $first: "$Tipo" },
                    Capacidad: { $first: "$Capacidad" },
                    Precio_Diario: { $first: "$Precio_Diario" },
                    "fk_automovil_sucursal_automovil": { $push: "$fk_automovil_sucursal_automovil" },
                    "total_Automoviles": { $sum: "$fk_automovil_sucursal_automovil.Cantidad_Disponible" },
                    "fk_automovil_sucursal": { $push: "$fk_automovil_sucursal" }
                }
            },
            {
                $project: {
                  _id: 0,
                  Anio: 0,
                  "fk_automovil_sucursal_automovil._id": 0,
                  "fk_automovil_sucursal_automovil.ID_Automovil_ID_Automovil": 0,
                  "fk_automovil_sucursal._id": 0,
                }
            },
            {
                $sort: {
                    _ID_Automovil: +1
                } 
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 11. Mostrar todos los automóviles con una capacidad mayor a 5 personas.
// http://127.10.10.10:5500/automovil/capacidad
storageAutomovil.get("/capacidad", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.aggregate([
            {
                $match: {
                    Capacidad: {$gt: 5}
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
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 16. Listar todos los automóviles ordenados por marca y modelo. 
// http://127.10.10.10:5500/automovil/order
storageAutomovil.get("/order", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.aggregate([
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    Marca: +1
                } 
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 17. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección. 
// http://127.10.10.10:5500/automovil/cantidad_direccion
storageAutomovil.get("/cantidad_direccion", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.aggregate([
            {
                $lookup: {
                  from: "sucursal_automovil",
                  localField: "_ID_Automovil",
                  foreignField: "ID_Automovil_ID_Automovil",
                  as: "fk_automovil_sucursal_automovil"
                }
            },
            {
                $lookup: {
                  from: "sucursal",
                  localField: "fk_automovil_sucursal_automovil.ID_Sucursal_ID_Sucursal",
                  foreignField: "_ID_Sucursal",
                  as: "fk_automovil_sucursal"
                }
            },
            {
                $project: {
                  _id: 0,
                  Anio: 0,
                  "fk_automovil_sucursal_automovil._id": 0,
                  "fk_automovil_sucursal_automovil.ID_Automovil_ID_Automovil": 0,
                  "fk_automovil_sucursal._id": 0,
                  "fk_automovil_sucursal.Nombre": 0,
                  "fk_automovil_sucursal.Telefono": 0,
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 19.Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles. 
// http://127.10.10.10:5500/automovil/capacidad_disponible
storageAutomovil.get("/capacidad_disponible", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("automovil");
        let data = await tabla.aggregate([
            {
                $match: {
                    Capacidad: 5
                }
            },
            {
                $lookup: {
                    from: "alquiler",
                    localField: "_ID_Automovil",
                    foreignField: "ID_Automovil_ID_Automovil",
                    as: "fk_automovil_alquiler"
                }
            },
            {
                $unwind: "$fk_automovil_alquiler"
            },
            {
                $match: {
                    "fk_automovil_alquiler.Estado": "Activo"
                }
            },
            {
                $project: {
                    _id: 0,
                    _ID_Automovil: 1,
                    Marca: 1,
                    Modelo: 1,
                    Anio: 1,
                    Tipo: 1,
                    Capacidad: 1,
                    Precio_Diario: 1,
                    "fk_automovil_alquiler": 1
                }
            },
            {
                $group: {
                    _id: "$_ID_Automovil",
                    _ID_Automovil: { $first: "$_ID_Automovil" },
                    Marca: { $first: "$Marca" },
                    Modelo: { $first: "$Modelo" },
                    Anio: { $first: "$Anio" },
                    Tipo: { $first: "$Tipo" },
                    Capacidad: { $first: "$Capacidad" },
                    Precio_Diario: { $first: "$Precio_Diario" },
                    "fk_automovil_alquiler": { $push: "$fk_automovil_alquiler" }
                }
            },
            {
                $project: {
                    _id: 0,
                    "fk_automovil_alquiler._id": 0,
                    "fk_automovil_alquiler.ID_Automovil_ID_Automovil": 0,
        
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default storageAutomovil;