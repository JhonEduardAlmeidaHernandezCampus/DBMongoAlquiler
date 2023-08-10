import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageReserva = Router()
let db = await con()

storageReserva.get("/", configGET(), async(req, res) => {
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
        ID_Reserva: 1,
        ID_Cliente_ID_Cliente: 1,
        ID_Automovil_ID_Automovil: 1,
        Fecha_Reserva: new Date("2023-08-12"),
        Fecha_Inicio: new Date("2023-08-12"),
        Fecha_Fin: new Date("2023-08-12"),
        Estado: "Activo"
    }
*/
storageReserva.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("reserva")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Reserva creada con exito")

    } catch (error) {
        res.status(400).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
})

// storageReserva.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("reserva")
//         let res = await collection.bulkWrite([
//             {
//                 updateOne: {
//                     filter: { _ID_Sucursal: Object.values(id) },
//                     update: { $set: req.body }
//                 }
//             }
//         ])
//         res.send("Registro actualizado con exito")

//     } catch (error) {
//         res.status(400).send("Error al actualizar el registro")
//     }
// })

// storageReserva.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("reserva")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageReserva;