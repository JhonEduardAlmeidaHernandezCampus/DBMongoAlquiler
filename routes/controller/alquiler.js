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
export class Alquiler {
    constructor(data) {
        Object.assign(this, data);
        this._ID_Alquiler = 0;
        this.ID_Cliente_ID_Cliente = 0;
        this.ID_Automovil_ID_Automovil = 0;
        this.Fecha_Inicio = "";
        this.Fecha_Fin = "";
        this.Costo_Total = 0;
        this.Estado = "";
    }
}
__decorate([
    Expose({ name: 'ID' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID_Client is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Alquiler.prototype, "_ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'ID_Client' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID_Client is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Cliente_ID_Cliente", void 0);
__decorate([
    Expose({ name: 'ID_Car' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID_Car is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Alquiler.prototype, "ID_Automovil_ID_Automovil", void 0);
__decorate([
    Expose({ name: 'Date_Start' }),
    IsDefined({ message: () => { throw { status: 422, message: `Date_Start is required` }; } }),
    Transform(({ value }) => { if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Alquiler.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'Date_End' }),
    IsDefined({ message: () => { throw { status: 422, message: `Date_End is required` }; } }) // Ver por que no me muestra el mensaje de requerido por la expresion regular :)
    ,
    Transform(({ value }) => { if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Alquiler.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'Daily_Price' }),
    IsDefined({ message: () => { throw { status: 422, message: `Daily_Price is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Alquiler.prototype, "Costo_Total", void 0);
__decorate([
    Expose({ name: 'Status' }),
    IsDefined({ message: () => { throw { status: 422, message: `Status is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Alquiler.prototype, "Estado", void 0);
