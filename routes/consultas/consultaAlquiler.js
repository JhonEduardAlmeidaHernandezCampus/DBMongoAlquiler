import { Router } from 'express'
import { con } from '../../db/connect.js'
import { configGET } from '../../middleware/limit.js'

let storageConsultaAlquiler = Router()
let db = await con()

// 6. Obtener los detalles del alquiler con el ID_Alquiler específico. 
// http://127.10.10.10:5500/consulta_alquiler/id/2 
storageConsultaAlquiler.get("/id/:id", configGET(), async(req, res) => {
    try {
        let { id } = req.params
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
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 9. Obtener el costo total de un alquiler específico. 
// http://127.10.10.10:5500/consulta_alquiler/costo_alquiler/4
storageConsultaAlquiler.get("/costo_alquiler/:id", configGET(), async(req, res) => {
    try {
        let { id } = req.params
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
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 12. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'. 
// http://127.10.10.10:5500/consulta_alquiler/fecha_inicio
storageConsultaAlquiler.get("/fecha_inicio", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("alquiler");
        let data = await tabla.aggregate([
            {
                $match: {
                    Fecha_Inicio: '2023-07-05'
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
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 18. Obtener la cantidad total de alquileres registrados en la base de datos.
storageConsultaAlquiler.get("/total", async(req, res) => {
    try {
        let tabla = db.collection("alquiler");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 21. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'. 
// http://127.10.10.10:5500/consulta_alquiler/fecha_entre
storageConsultaAlquiler.get("/fecha_entre", async(req, res) => {
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
        res.status(402).send("Error al ejecutar la consulta")
    }
})

export default storageConsultaAlquiler;