import { Router } from 'express';
import { con } from '../db/connect.js';
import { configGET } from '../middleware/limit.js';
import { validarEstructura, validarData } from '../middleware/middlewareCliente.js';
import { validarParams } from '../middleware/validarID.js';

let storageCliente = Router()
let db = await con()

storageCliente.get("/", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("cliente");
        let data = await tabla.find().toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al mostrar los datos de los clientes")
    }
})

/*
    {
        "ID": 1,
        "Name": "Camilo",
        "Surname": "Sanchez",
        "Identification": "25544771",
        "Address": "Zapatoca - Santander",
        "Phone": "+57 3002447166",
        "Email": "camilo.Sanchez@gmail.com"
    }
*/
storageCliente.post("/", configGET(), validarEstructura, validarData, async(req, res) => {
    try {
        let tabla = db.collection("cliente")
        await tabla.insertOne(req.body);
        console.log(req.rateLimit);

        res.send({status: 200, message: "Registro creado con exito"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageCliente.put("/:ID", configGET(), validarEstructura, validarParams, validarData, async(req, res) => {
    try {

        let id = req.params;
        id = parseInt(id)

        let collection = db.collection("cliente")
        let respuesta = await collection.updateOne(
            { _ID_Cliente: id },
            { $set: req.body }
        )

        res.send({status: 200, message: "Registro actualizado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "" + error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description})
    }
})

storageCliente.delete("/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {

        let id = req.params;
        id = parseInt(id)
        
        let collection = db.collection("cliente")
        let respuesta = await collection.deleteOne({_ID_Cliente: id})

        res.send({status: 200, message: "Registro eliminado exitosamente"})

    } catch (error) {
        res.send({status: 400, message: "Error al eliminar el registro"})
    }
})

// Consultas -------------------------------------------------------------------------------------------------------

// 2. Mostrar todos los clientes registrados en la base de datos. 
// http://127.10.10.10:5500/cliente/todos
storageCliente.get("/todos", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
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

// 4. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
// http://127.10.10.10:5500/cliente/alquileres_activos
storageCliente.get("/alquileres_activos", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
            {
                $lookup: {
                    from: "alquiler",
                    localField: "_ID_Cliente",
                    foreignField: "ID_Cliente_ID_Cliente",
                    as: "fk_cliente_alquiler"
                }
            },
            {
                $unwind: "$fk_cliente_alquiler"
            },
            {
                $match: {
                    "fk_cliente_alquiler.Estado": "Activo"
                }
            },
            {
                $project: {
                    _id: 0,
                    _ID_Cliente: 1, 
                    Nombre: 1,
                    Apellido : 1,
                    DNI: 1,
                    Telefono: 1,
                    "fk_cliente_alquiler": 1
                }
            },
            {
                $group: {
                    _id: "$_ID_Cliente",
                    _ID_Cliente: { $first: "$_ID_Cliente" },
                    Nombre: { $first: "$Nombre" },
                    Apellido : { $first: "$Apellido" },
                    DNI: { $first: "$DNI" },
                    Telefono: { $first: "$Telefono" },
                    fk_cliente_alquiler: { $push: "$fk_cliente_alquiler" }
                }
            },
            {
                $project: {
                    _id: 0,
                    "fk_cliente_alquiler._id": 0,
                    "fk_cliente_alquiler.ID_Cliente_ID_Cliente": 0,
                }
            },
            {
                $sort: {_ID_Cliente: +1} // Organizar los datos por el campo ID de manera ascendente 
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
// http://127.10.10.10:5500/cliente/reservas_pendientes
storageCliente.get("/reservas_pendientes", configGET(), validarEstructura, async(req, res) => {
    try {
        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
            {
                $lookup: {
                    from: "reserva",
                    localField: "_ID_Cliente",
                    foreignField: "ID_Cliente_ID_Cliente",
                    as: "fk_cliente_reserva"
                }
            },
            {
                $unwind: "$fk_cliente_reserva"
            },
            {
                $match: {"fk_cliente_reserva.Estado": "Pendiente"}
            },
            {
                $lookup: {
                    from: "automovil",
                    localField: "fk_cliente_reserva.ID_Automovil_ID_Automovil",
                    foreignField: "_ID_Automovil",
                    as: "fk_cliente_automovil"
                }
            },
            {
                $unwind: "$fk_cliente_automovil"
            },
            {
                $project: {
                    _id: 0,
                    _ID_Cliente: 1,
                    Nombre: 1,
                    Apellido: 1,
                    DNI: 1,
                    Direccion: 1,
                    Telefono: 1,
                    Email: 1,
                    "fk_cliente_reserva": 1,
                    "fk_cliente_automovil": 1
                }
            },
            {
                $project: {
                    "fk_cliente_reserva._id": 0,
                    "fk_cliente_reserva.ID_Cliente_ID_Cliente": 0,
                    "fk_cliente_automovil._id": 0
                }
            },
            {
                $group: {
                    _id: "$_ID_Cliente",
                    _ID_Cliente: { $first: "$_ID_Cliente" },
                    Nombre: { $first: "$Nombre" },
                    Apellido : { $first: "$Apellido" },
                    DNI: { $first: "$DNI" },
                    Telefono: { $first: "$Telefono" },
                    fk_cliente_reserva: { $push: "$fk_cliente_reserva" },
                    fk_cliente_automovil: { $push: "$fk_cliente_automovil" }
                }
            },
            {
                $project: {
                    _id: 0,
                    "fk_cliente_reserva.ID_Automovil_ID_Automovil": 0
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 10. Listar los clientes con el DNI específico. 
// http://127.10.10.10:5500/cliente/dni/1102312327
storageCliente.get("/dni/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {
        let id = req.params

        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
            {
                $match: {
                    DNI: id
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

// 13. Listar las reservas pendientes realizadas por un cliente específico.
// http://127.10.10.10:5500/cliente/cliente_id/4
storageCliente.get("/cliente_id/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {
        let id = req.params
        id = parseInt(id)

        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
            {
                $match: {
                    "_ID_Cliente": id
                }
            },
            {
                $lookup: {
                    from: "reserva",
                    localField: "_ID_Cliente",
                    foreignField: "ID_Cliente_ID_Cliente",
                    as: "fk_cliente_reserva"
                }
            },
            {
                $unwind: "$fk_cliente_reserva"
            },
            {
                $match: {
                    "fk_cliente_reserva.Estado": "Pendiente"
                }
            },
            {
                $project: {
                    _id: 0,
                    _ID_Cliente: 1,
                    Nombre: 1,
                    Apellido: 1,
                    DNI: 1,
                    Direccion: 1,
                    Telefono: 1,
                    Email: 1,
                    "fk_cliente_reserva": 1
                }
            },
            {
                $project: {
                    "fk_cliente_reserva._id": 0,
                    "fk_cliente_reserva.ID_Cliente_ID_Cliente": 0
                }
            },
            {
                $group: {
                    _id: "$_ID_Cliente",
                    _ID_Cliente: { $first: "$_ID_Cliente" },
                    Nombre: { $first: "$Nombre" },
                    Apellido : { $first: "$Apellido" },
                    DNI: { $first: "$DNI" },
                    Telefono: { $first: "$Telefono" },
                    fk_cliente_reserva: { $push: "$fk_cliente_reserva" }
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 15. Obtener los datos de los clientes que realizaron al menos un alquiler. 
// http://127.10.10.10:5500/cliente/realizaron_alquiler
storageCliente.get("/realizaron_alquiler", configGET(), validarEstructura, async(req, res) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
            {
                $lookup: {
                  from: "alquiler",
                  localField: "_ID_Cliente",
                  foreignField: "ID_Cliente_ID_Cliente",
                  as: "fk_cliente_alquiler"
                }
            },
            {
                $match: {
                  "fk_cliente_alquiler.Estado": { $in: ["Activo", "Finalizado"]}
                }
            },
            {
                $group: {
                    _id: "$_ID_Cliente",
                    _ID_Cliente: { $first: "$_ID_Cliente" },
                    Nombre: { $first: "$Nombre" },
                    Apellido : { $first: "$Apellido" },
                    DNI: { $first: "$DNI" },
                    Telefono: { $first: "$Telefono" },
                    fk_cliente_alquiler: { $push: "$fk_cliente_alquiler" }
                }
            },
            {
                $project: {
                    _id: 0,
                    "fk_cliente_alquiler._id": 0,
                    "fk_cliente_alquiler.ID_Cliente_ID_Cliente": 0
                }
            },
            {
                $sort: {
                    "_ID_Cliente": +1
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 15. Obtener los datos de los clientes que realizaron al menos un alquiler. 
// http://127.10.10.10:5500/cliente/reserva_id/2
storageCliente.get("/reserva_id/:ID", configGET(), validarEstructura, validarParams, async(req, res) => {
    try {
        let id = req.params
        id = parseInt(id)

        let tabla = db.collection("cliente");
        let data = await tabla.aggregate([
            {
                $lookup: {
                  from: "reserva",
                  localField: "_ID_Cliente",
                  foreignField: "ID_Cliente_ID_Cliente",
                  as: "fk_cliente_reserva"
                }
            },
            {
                $unwind: "$fk_cliente_reserva"
            },
            {
                $match: {
                    "fk_cliente_reserva.ID_Reserva": id
                }
            },
            {
                $project: {
                    _id: 0,
                    "fk_cliente_reserva._id": 0,
                    "fk_cliente_reserva.ID_Cliente_ID_Cliente": 0
                }
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// -------------------------------------------------------------------------------------------------------------

export default storageCliente;