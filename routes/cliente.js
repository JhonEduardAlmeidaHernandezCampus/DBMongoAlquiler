import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageCliente = Router()
let db = await con()

storageCliente.get("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("cliente");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los clientes")
    }
})

storageCliente.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("cliente")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Registro creado con exito")

    } catch (error) {
        res.status(400).send("Error al crear el registro del cliente")
    }
})

// storageCliente.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("cliente")
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

// storageCliente.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("cliente")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageCliente;