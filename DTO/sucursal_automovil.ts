import { Expose, Transform } from 'class-transformer';

export class Sucursal_Automovil {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Sucursal_ID_Sucursal: number;

    @Expose({ name: 'ID_Car' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Car is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Automovil_ID_Automovil: number;

    @Expose({ name: 'Quantity_Available' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Quantity_Available is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Cantidad_Disponible: number;

    constructor(data:Partial<Sucursal_Automovil>){
        Object.assign(this, data)
        this.ID_Sucursal_ID_Sucursal = 0;
        this.ID_Automovil_ID_Automovil = 0;
        this.Cantidad_Disponible = 0;
    }
}