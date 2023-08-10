import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageAlquiler = Router()
let db = await con()

storageAlquiler.get("/", configGET(), async(req, res) => {
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
        _ID_Alquiler: 1,
        ID_Cliente_ID_Cliente: 1,
        ID_Automovil_ID_Automovil: 1,
        Fecha_Inicio: new Date("2023-08-12"),
        Fecha_Fin: new Date("2023-08-12"),
        Costo_Total: 100000,
        Estado: "Activo"
    }
*/
storageAlquiler.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("alquiler")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Registro creado con exito")

    } catch (error) {
        res.status(400).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
})

// storageAlquiler.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("alquiler")
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

// storageAlquiler.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("alquiler")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageAlquiler;