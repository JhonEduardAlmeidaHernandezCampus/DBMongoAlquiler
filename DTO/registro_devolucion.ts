import { Expose, Transform } from 'class-transformer';

export class Registro_Devolucion {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros 1`};}, {toClassOnly: true})
    ID_Registro: number;

    @Expose({ name: 'ID_Hire' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Hire is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Alquiler_ID_Alquiler: number;

    @Expose({ name: 'ID_Employee' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Employee is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Empleado_ID_Empleado: number;

    @Expose({ name: 'Date_Return' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Date_Return is required` }}
                                if(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Fecha_Devolucion: string;

    @Expose({ name: 'Fuel_Return' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Fuel_Return is required` }}
                                if(/^[a-zA-Z0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Combustible_Devuelto: string;

    @Expose({ name: 'Mileage_Return' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Mileage_Return is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Kilometraje_Devuelto: number;

    @Expose({ name: 'Additional_Amount' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Additional_Amount is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Monto_Adicional: number;

    constructor(data:Partial<Registro_Devolucion>){
        Object.assign(this, data)
        this.ID_Registro = 0;
        this.ID_Alquiler_ID_Alquiler = 0;
        this.ID_Empleado_ID_Empleado = 0;
        this.Fecha_Devolucion = "";
        this.Combustible_Devuelto = "";
        this.Kilometraje_Devuelto = 0;
        this.Monto_Adicional = 0;
    }
}