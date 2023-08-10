import { Router } from 'express'
import { con } from '../../db/connect.js'
import { configGET } from '../../middleware/limit.js'

let storageConsultaCliente = Router()
let db = await con()

// 2. Mostrar todos los clientes registrados en la base de datos. 
// http://127.10.10.10:5500/consulta_cliente
storageConsultaCliente.get("/", configGET(), async(req, res) => {
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
// http://127.10.10.10:5500/consulta_cliente/alquileres_activos
storageConsultaCliente.get("/alquileres_activos", configGET(), async(req, res) => {
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
// http://127.10.10.10:5500/consulta_cliente/reservas_pendientes
storageConsultaCliente.get("/reservas_pendientes", configGET(), async(req, res) => {
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
            }
        ]).toArray();
        res.send(data)

    } catch (error) {
        res.status(402).send("Error al ejecutar la consulta")
    }
})

// 10. Listar los clientes con el DNI específico. 
// http://127.10.10.10:5500/consulta_cliente/dni/1102312327
storageConsultaCliente.get("/dni/:id", configGET(), async(req, res) => {
    try {
        let { id } = req.params
        id = parseInt(id)
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
// http://127.10.10.10:5500/consulta_cliente/cliente_id/4
storageConsultaCliente.get("/cliente_id/:id", configGET(), async(req, res) => {
    try {
        let { id } = req.params
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
// http://127.10.10.10:5500/consulta_cliente/realizaron_alquiler
storageConsultaCliente.get("/realizaron_alquiler", configGET(), async(req, res) => {
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
// http://127.10.10.10:5500/consulta_cliente/reserva_id/2
storageConsultaCliente.get("/reserva_id/:id", configGET(), async(req, res) => {
    try {
        let { id } = req.params
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

export default storageConsultaCliente;