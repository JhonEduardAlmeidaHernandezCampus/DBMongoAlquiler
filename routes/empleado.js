import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareEmpleado.js';
import { validarParams, validarParamsDate } from '../middleware/validarID.js';

let storageEmpleado = Router()
let db = await con()

storageEmpleado.get("/", configGET(), validarEstructura, async(req, res) => {
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
        "ID": 1,
        "Name": "Camilo Andres",
        "Surname": "Quintero Sanchez",
        "Identification": "336524621",
        "Address": "Lebrija - Santander",
        "Phone": "+57 3225489677",
        "Position": "Gerente"
    }
*/
storageEmpleado.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("empleado")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);
        
        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageEmpleado.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("empleado")
        let respuesta = await collection.updateOne(
            { _ID_Empleado: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageEmpleado.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params
        id = parseInt(id)

        let collection = db.collection("empleado")
        let respuesta = await collection.deleteOne({_ID_Empleado: id})
        
        res.send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

// Consultas -----------------------------------------------------------------------------------------------------

// 7. Listar los empleados con el cargo de "Vendedor". 
// http://127.10.10.10:5500/empleado/cargo/Vendedor
storageEmpleado.get("/cargo/:ID", configGET(), validarEstructura, validarParamsDate, async(req, res) => {
    try {
        let id = req.params

        let tabla = db.collection("empleado");
        let data = await tabla.aggregate([
            {
                $match: {
                    Cargo: id
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

// 14. Mostrar los empleados con cargo de "Gerente" o "Asistente". 
// http://127.10.10.10:5500/empleado/multiple_cargo
storageEmpleado.get("/multiple_cargo", configGET(), async(req, res) => {
    try {
        let { cargo } = req.params
        let tabla = db.collection("empleado");
        let data = await tabla.aggregate([
            {
                $match: {
                    Cargo: { $in: [ "Gerente", "Asistente" ] }
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

// ---------------------------------------------------------------------------------------------------------------
export default storageEmpleado;