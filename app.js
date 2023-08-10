import dotenv from 'dotenv'
import express from 'express'
import storageSucursal from './routes/sucursal.js';
import storageAutomovil from './routes/automovil.js';
import storageCliente from './routes/cliente.js';
import storageEmpleado from './routes/empleado.js';
import storageAlquiler from './routes/alquiler.js';
import storageSucursalAutomovil from './routes/sucursal_automovil.js';
import storageReserva from './routes/reserva.js';
import storageRegistroDevolucion from './routes/registro_devolucion.js';
import storageRegistroEntrega from './routes/registro_entrega.js';

// Consultas
import storageConsultaCliente from './routes/consultas/consultaCliente.js';
import storageConsultaAutomovil from './routes/consultas/consultaAutomoviles.js';
import storageConsultaAlquiler from './routes/consultas/consultaAlquiler.js';
import storageConsultaEmpleado from './routes/consultas/consultaEmpleado.js';

dotenv.config()
let app = express();
app.use(express.json());

app.use("/sucursal", storageSucursal);
app.use("/automovil", storageAutomovil);
app.use("/cliente", storageCliente);
app.use("/empleado", storageEmpleado);
app.use("/alquiler", storageAlquiler);
app.use("/sucursal_automovil", storageSucursalAutomovil);
app.use("/reserva", storageReserva);
app.use("/registro_devolucion", storageRegistroDevolucion);
app.use("/registro_entrega", storageRegistroEntrega);

app.use("/consulta_cliente", storageConsultaCliente);
app.use("/consulta_automovil", storageConsultaAutomovil);
app.use("/consulta_alquiler", storageConsultaAlquiler);
app.use("/consulta_empleado", storageConsultaEmpleado);

let config = JSON.parse(process.env.Server)
app.listen(config, () => console.log(`http://${config.hostname}:${config.port}`))