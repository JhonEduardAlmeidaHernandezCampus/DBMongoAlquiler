import dotenv from 'dotenv'
import express from 'express'
import storageSucursal from './routes/sucursal.js';
import storageSucursalAutomovil from './routes/sucursal_automovil.js';
import storageReserva from './routes/reserva.js';
import storageCliente from './routes/cliente.js';

dotenv.config()
let app = express();
app.use(express.json());

app.use("/sucursal", storageSucursal);
app.use("/sucursal_automovil", storageSucursalAutomovil);
app.use("/reserva", storageReserva);
app.use("/cliente", storageCliente);

let config = JSON.parse(process.env.Server)
app.listen(config, () => console.log(`http://${config.hostname}:${config.port}`))