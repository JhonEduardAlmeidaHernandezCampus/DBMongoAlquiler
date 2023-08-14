import { Expose, Type, Transform} from 'class-transformer';

export class validarID {

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Alquiler: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(/^[0-9\w]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Fecha_Inicio: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Automovil: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Cliente: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    DNI: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Empleado: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(/^[a-zA-Z\s]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Cargo: string;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Registro: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Reserva: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Sucursal_ID_Sucursal: number;

    @Expose({name: 'ID'})
    @Transform(({value}) => {if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    _ID_Sucursal: number;

    constructor(_ID_Alquiler: number, _ID_Automovil: number, _ID_Cliente: number, _ID_Empleado: number, ID_Registro: number, ID_Reserva: number, ID_Sucursal_ID_Sucursal: number, _ID_Sucursal: number){
        this._ID_Alquiler = _ID_Alquiler;
        this._ID_Automovil = _ID_Automovil;
        this._ID_Cliente = _ID_Cliente;
        this._ID_Empleado = _ID_Empleado;
        this.ID_Registro = ID_Registro;
        this.ID_Reserva = ID_Reserva;
        this.ID_Sucursal_ID_Sucursal = ID_Sucursal_ID_Sucursal;
        this._ID_Sucursal = _ID_Sucursal;
    }
}