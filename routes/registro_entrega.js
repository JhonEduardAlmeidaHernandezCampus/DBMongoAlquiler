import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageRegistroEntrega = Router()
let db = await con()

storageRegistroEntrega.get("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("registro_entrega");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los registros de entrega")
    }
})

/*
    {
        ID_Registro: 1,
        ID_Alquiler_ID_Alquiler: 1,
        ID_Empleado_ID_Empleado: 1,
        Fecha_Entrega: new Date("2023-08-12"),
        Combustible_Entregado: "Gasolina",
        Kilometraje_Entregado: 1
    }
*/
storageRegistroEntrega.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("registro_entrega")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Registro creado con exito")

    } catch (error) {
        res.status(400).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
})

// storageRegistroEntrega.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("registro_entrega")
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

// storageRegistroEntrega.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("registro_entrega")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageRegistroEntrega;