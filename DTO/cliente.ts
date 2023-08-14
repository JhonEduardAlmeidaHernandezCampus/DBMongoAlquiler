import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class Cliente {

    @Expose({ name: 'ID' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `ID is required`}}})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros 1`};}, {toClassOnly: true})
    _ID_Cliente: number;

    @Expose({ name: 'Name' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `Name is required`}}})
    @Transform(({value}) => {if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Nombre: string;

    @Expose({ name: 'Surname' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `Surname is required`}}})
    @Transform(({value}) => {if(/^[a-z-A-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Apellido: string;

    @Expose({ name: 'Identification' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `Identification is required`}}})
    @Transform(({value}) => {if(/^[0-9]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    DNI: string;

    @Expose({ name: 'Address' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `Address is required`}}})
    @Transform(({value}) => {if(/^[a-zA-Z0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Direccion: string;

    @Expose({ name: 'Phone' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `Phone is required`}}})
    @Transform(({value}) => {if(/^[0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Telefono: string;

    @Expose({ name: 'Email' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `Email is required`}}})
    @Transform(({value}) => { if(/\S+@\S+\.\S+/.test(value)) return value; else throw {status: 400, message: `Error en los parametros`}}, {toClassOnly: true})    
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