import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageAutomovil = Router()
let db = await con()

storageAutomovil.get("/", configGET(), async(req, res) => {
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
        "_ID_Automovil": "1-SP25448546",
        "Marca": "Chevrolet",
        "Modelo": "Spark",
        "Anio": 2020,
        "Tipo": "Auto",
        "Capacidad": 5,
        "Precio_Diario": 1000000
    }
*/
storageAutomovil.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("automovil")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Registro creado con exito")

    } catch (error) {
        res.status(400).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
})

// storageAutomovil.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("automovil")
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

// storageAutomovil.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("automovil")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageAutomovil;