import { Expose, Transform } from 'class-transformer';

export class Sucursal {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Sucursal: number;

    @Expose({ name: 'Name' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Name is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Nombre: string;

    @Expose({ name: 'Address' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Address is required` }}
                                if(/^[a-zA-Z0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Direccion: string;

    @Expose({ name: 'Phone' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Phone is required` }}
                                if(/^[0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Telefono: string;

    constructor(data:Partial<Sucursal>){
        Object.assign(this, data)
        this._ID_Sucursal = 0;
        this.Nombre = "";
        this.Direccion = "";
        this.Telefono = "";
    }
}