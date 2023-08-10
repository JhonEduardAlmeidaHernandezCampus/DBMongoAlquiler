import { Router } from 'express'
import { con } from '../../db/connect.js'
import { configGET } from '../../middleware/limit.js'

let storageConsultaAutomovil = Router()
let db = await con()

// 3. Obtener todos los automóviles disponibles para alquiler.
// http://127.10.10.10:5500/consulta_automovil
storageConsultaAutomovil.get("/", configGET(), async(req, res) => {
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
// http://127.10.10.10:5500/consulta_automovil/cantidad_total
storageConsultaAutomovil.get("/cantidad_total", configGET(), async(req, res) => {
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
                  "fk_automovil_sucursal_automovil.ID_Sucursal_ID_Sucursal": 0,
                  "fk_automovil_sucursal_automovil.ID_Automovil_ID_Automovil": 0,
                  "fk_automovil_sucursal._id": 0,
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 11. Mostrar todos los automóviles con una capacidad mayor a 5 personas.
// http://127.10.10.10:5500/consulta_automovil/capacidad
storageConsultaAutomovil.get("/capacidad", configGET(), async(req, res) => {
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
// http://127.10.10.10:5500/consulta_automovil/order
storageConsultaAutomovil.get("/order", configGET(), async(req, res) => {
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
// http://127.10.10.10:5500/consulta_automovil/cantidad_direccion
storageConsultaAutomovil.get("/cantidad_direccion", configGET(), async(req, res) => {
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
                  "fk_automovil_sucursal_automovil.ID_Sucursal_ID_Sucursal": 0,
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
// http://127.10.10.10:5500/consulta_automovil/capacidad_disponible
storageConsultaAutomovil.get("/capacidad_disponible", configGET(), async(req, res) => {
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

export default storageConsultaAutomovil;