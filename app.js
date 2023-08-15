import dotenv from 'dotenv'
import express from 'express'

import { generarToken, validarToken } from './tokens/tokens.js';

import storageSucursal from './routes/sucursal.js';
import storageAutomovil from './routes/automovil.js';
import storageCliente from './routes/cliente.js';
import storageEmpleado from './routes/empleado.js';
import storageAlquiler from './routes/alquiler.js';
import storageSucursalAutomovil from './routes/sucursal_automovil.js';
import storageReserva from './routes/reserva.js';
import storageRegistroDevolucion from './routes/registro_devolucion.js';
import storageRegistroEntrega from './routes/registro_entrega.js';

dotenv.config()
let app = express();
app.use(express.json());

app.use("/generarToken", generarToken)

app.use("/sucursal", validarToken, storageSucursal);
app.use("/automovil", validarToken, storageAutomovil);
app.use("/cliente", validarToken, storageCliente);
app.use("/empleado", validarToken, storageEmpleado);
app.use("/alquiler", validarToken, storageAlquiler);
app.use("/sucursal_automovil", validarToken, storageSucursalAutomovil);
app.use("/reserva", validarToken, storageReserva);
app.use("/registro_devolucion", validarToken, storageRegistroDevolucion);
app.use("/registro_entrega", validarToken, storageRegistroEntrega);

let config = JSON.parse(process.env.MY_CONFIG)
app.listen(config, () => console.log(`http://${config.hostname}:${config.port}`))