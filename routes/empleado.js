import { Router } from 'express'
import { con } from '../db/connect.js'
import { configGET } from '../middleware/limit.js'

let storageEmpleado = Router()
let db = await con()

storageEmpleado.get("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("empleado");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los empleados")
    }
})

/*
    {
        "_ID_Empleado": 1,
        "Nombre": "Jhon Eduard",
        "Apellido": "Almeida Hernandez",
        "DNI": 1102391231,
        "Direccion": "Calle 11B # 1A - 20",
        "Telefono": "3005559677",
        "Cargo": "Gerente regional"
    }
*/
storageEmpleado.post("/", configGET(), async(req, res) => {
    try {
        let tabla = db.collection("empleado")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        res.send("Registro creado con exito")

    } catch (error) {
        res.status(400).send(error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
    }
})

// storageEmpleado.put("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("empleado")
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

// storageEmpleado.delete("/:id", async(req, res) => {
//     try {
//         let { id } = req.params;
//         let collection = db.collection("empleado")
//         let res = await collection.deleteOne({_ID_Sucursal: id})
//         res.send("Registro eliminado con exito")

//     } catch (error) {
//         res.status(400).send("Error al eliminar el registro")
//     }
// })

export default storageEmpleado;