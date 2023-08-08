import dotenv from 'dotenv'
import express from 'express'
import storageSucursal from './routes/sucursal.js';

dotenv.config()
let app = express();
app.use(express.json());

app.use("/sucursal", storageSucursal)

let config = JSON.parse(process.env.Server)
app.listen(config, () => console.log(`http://${config.hostname}:${config.port}`))