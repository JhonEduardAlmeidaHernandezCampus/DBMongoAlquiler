import { Expose, Transform } from 'class-transformer';

export class Alquiler {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Alquiler: number;
    
    @Expose({ name: 'ID_Client' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Client is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Cliente_ID_Cliente: number;

    @Expose({ name: 'ID_Car' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Car is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Automovil_ID_Automovil: number;

    @Expose({ name: 'Date_Start' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Date_Start is required` }}
                                if(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Fecha_Inicio: string;

    @Expose({ name: 'Date_End' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Date_End is required` }}
                                if(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Fecha_Fin: string;

    @Expose({ name: 'Daily_Price' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Daily_Price is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Costo_Total: number;

    @Expose({ name: 'Status' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Status is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Estado: string;

    constructor(data:Partial<Alquiler>){
        Object.assign(this, data)
        this._ID_Alquiler = 0;
        this.ID_Cliente_ID_Cliente = 0;
        this.ID_Automovil_ID_Automovil = 0;
        this.Fecha_Inicio = "";
        this.Fecha_Fin = "";
        this.Costo_Total = 0;
        this.Estado = "";
    }
}