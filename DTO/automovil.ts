import { Expose, Transform } from 'class-transformer';

export class Automovil {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Automovil: number;

    @Expose({ name: 'Brand' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Brand is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Marca: string;

    @Expose({ name: 'Model' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Model is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Modelo: string;

    @Expose({ name: 'Year' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Year is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Anio: number;

    @Expose({ name: 'Type' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Type is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Tipo: string;

    @Expose({ name: 'Capacity' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Capacity is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Capacidad: number;

    @Expose({ name: 'Daily_Price' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Daily_Price is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Precio_Diario: number;

    constructor(data:Partial<Automovil>){
        Object.assign(this, data)
        this._ID_Automovil = 0;
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo = "";
        this.Capacidad = 0;
        this.Precio_Diario = 0;
    }
}