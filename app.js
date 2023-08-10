import dotenv from 'dotenv'
import express from 'express'
import storageSucursal from './routes/sucursal.js';
import storageAutomovil from './routes/automovil.js';
import storageCliente from './routes/cliente.js';
import storageEmpleado from './routes/empleado.js';

dotenv.config()
let app = express();
app.use(express.json());

app.use("/sucursal", storageSucursal);
app.use("/automovil", storageAutomovil);
app.use("/cliente", storageCliente);
app.use("/empleado", storageEmpleado);

let config = JSON.parse(process.env.Server)
app.listen(config, () => console.log(`http://${config.hostname}:${config.port}`))