var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
export class Registro_Devolucion {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Registro = 0;
        this.ID_Alquiler_ID_Alquiler = 0;
        this.ID_Empleado_ID_Empleado = 0;
        this.Fecha_Devolucion = "";
        this.Combustible_Devuelto = "";
        this.Kilometraje_Devuelto = 0;
        this.Monto_Adicional = 0;
    }
}
__decorate([
    Expose({ name: 'ID' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros 1` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registro_Devolucion.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'ID_Hire' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID_Hire is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registro_Devolucion.prototype, "ID_Alquiler_ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'ID_Employee' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID_Employee is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registro_Devolucion.prototype, "ID_Empleado_ID_Empleado", void 0);
__decorate([
    Expose({ name: 'Date_Return' }),
    IsDefined({ message: () => { throw { status: 422, message: `Date_Return is required` }; } }),
    Transform(({ value }) => { if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Registro_Devolucion.prototype, "Fecha_Devolucion", void 0);
__decorate([
    Expose({ name: 'Fuel_Return' }),
    IsDefined({ message: () => { throw { status: 422, message: `Fuel_Return is required` }; } }),
    Transform(({ value }) => { if (/^[a-zA-Z0-9\s\W]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Registro_Devolucion.prototype, "Combustible_Devuelto", void 0);
__decorate([
    Expose({ name: 'Mileage_Return' }),
    IsDefined({ message: () => { throw { status: 422, message: `Mileage_Return is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registro_Devolucion.prototype, "Kilometraje_Devuelto", void 0);
__decorate([
    Expose({ name: 'Additional_Amount' }),
    IsDefined({ message: () => { throw { status: 422, message: `Additional_Amount is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registro_Devolucion.prototype, "Monto_Adicional", void 0);
