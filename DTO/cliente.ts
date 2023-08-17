import { Expose, Transform } from 'class-transformer';

export class Cliente {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros 1`};}, {toClassOnly: true})
    _ID_Cliente: number;

    @Expose({ name: 'Name' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Name is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Nombre: string;

    @Expose({ name: 'Surname' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Surname is required` }}
                                if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Apellido: string;

    @Expose({ name: 'Identification' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Identification is required` }}
                                if(/^[0-9]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    DNI: string;

    @Expose({ name: 'Address' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Address is required` }}
                                if(/^[a-zA-Z0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Direccion: string;

    @Expose({ name: 'Phone' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Phone is required` }}
                                if(/^[0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Telefono: string;

    @Expose({ name: 'Email' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Email is required` }}
                                if(/\S+@\S+\.\S+/.test(value)) return value; else throw {status: 400, message: `Error en los parametros`}}, {toClassOnly: true})    
    Email: string;

    constructor(data:Partial<Cliente>){
        Object.assign(this, data)
        this._ID_Cliente = 0;
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Email = "";
    }
}