import { Expose, Transform } from 'class-transformer';

export class Registro_Entrega {

    @Expose({ name: 'ID' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Registro: number;

    @Expose({ name: 'ID_Hire' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Hire is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Alquiler_ID_Alquiler: number;

    @Expose({ name: 'ID_Employee' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `ID_Employee is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    ID_Empleado_ID_Empleado: number;

    @Expose({ name: 'Date_Delivery' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Date_Delivery is required` }}
                                if(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Fecha_Entrega: string;

    @Expose({ name: 'Fuel_Delivery' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Fuel_Delivery is required` }}
                                if(/^[a-zA-Z0-9\s\W]+$/.test(value)) return value; else throw {status:400, message:`Error en los parametros`};}, {toClassOnly:true})
    Combustible_Entregado: string;

    @Expose({ name: 'Mileage_Delivery' })
    @Transform(({value}) => {   if (value === undefined || value === null) {throw { status: 422, message: `Mileage_Delivery is required` }}
                                if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {status: 400, message: `Error en los parametros`};}, {toClassOnly: true})
    Kilometraje_Entregado: number;

    constructor(data:Partial<Registro_Entrega>){
        Object.assign(this, data)
        this.ID_Registro = 0;
        this.ID_Alquiler_ID_Alquiler = 0;
        this.ID_Empleado_ID_Empleado = 0;
        this.Fecha_Entrega = "";
        this.Combustible_Entregado = "";
        this.Kilometraje_Entregado = 0;
    }
}