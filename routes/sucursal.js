import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageSucursal = Router()
let db = await con()

storageSucursal.get("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("sucursal");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de las sucursales")
    }
})

storageSucursal.post("/", async(req, res) => {
    try {
        let tabla = db.collection("sucursal")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Sucursal creada con exito")

    } catch (error) {
        console.log(error);
        res.status(400).send("Error al crear el registro de la sucursal, datos incorrectos")
    }
})

// storageSucursal.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("sucursal")
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

// storageSucursal.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("sucursal")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageSucursal;