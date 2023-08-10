import { Router } from 'express'
import { con } from '../../db/connect.js'
import { configGET } from '../../middleware/limit.js'

let storageConsultaEmpleado = Router()
let db = await con()

// 7. Listar los empleados con el cargo de "Vendedor". 
// http://127.10.10.10:5500/consulta_empleado/cargo/Vendedor
storageConsultaEmpleado.get("/cargo/:cargo", configGET(), async(req, res) => {
    try {
        let { cargo } = req.params
        let tabla = db.collection("empleado");
        let data = await tabla.aggregate([
            {
                $match: {
                    Cargo: cargo
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
// http://127.10.10.10:5500/consulta_empleado/multiple_cargo
storageConsultaEmpleado.get("/multiple_cargo", configGET(), async(req, res) => {
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

export default storageConsultaEmpleado;