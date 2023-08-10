import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageSucursalAutomovil = Router()
let db = await con()

storageSucursalAutomovil.get("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("sucursal_automovil");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de las sucursales de los automoviles")
    }
})

/*
    {
        "ID_Sucursal_ID_Sucursal": 1,
        "ID_Automovil_ID_Automovil": 1,
        "Cantidad_Disponible": 10
    }
*/
storageSucursalAutomovil.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("sucursal_automovil")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Sucursal de automovil creada con exito")

    } catch (error) {
        res.status(400).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
})

// storageSucursalAutomovil.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("sucursal_automovil")
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

// storageSucursalAutomovil.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("sucursal_automovil")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageSucursalAutomovil;