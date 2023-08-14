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
export class Automovil {
    constructor(data) {
        Object.assign(this, data);
        this._ID_Automovil = 0;
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo = "";
        this.Capacidad = 0;
        this.Precio_Diario = 0;
    }
}
__decorate([
    Expose({ name: 'ID' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Automovil.prototype, "_ID_Automovil", void 0);
__decorate([
    Expose({ name: 'Brand' }),
    IsDefined({ message: () => { throw { status: 422, message: `Brand is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Automovil.prototype, "Marca", void 0);
__decorate([
    Expose({ name: 'Model' }),
    IsDefined({ message: () => { throw { status: 422, message: `Model is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Automovil.prototype, "Modelo", void 0);
__decorate([
    Expose({ name: 'Year' }),
    IsDefined({ message: () => { throw { status: 422, message: `Year is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Automovil.prototype, "Anio", void 0);
__decorate([
    Expose({ name: 'Type' }),
    IsDefined({ message: () => { throw { status: 422, message: `Type is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Automovil.prototype, "Tipo", void 0);
__decorate([
    Expose({ name: 'Capacity' }),
    IsDefined({ message: () => { throw { status: 422, message: `Capacity is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Automovil.prototype, "Capacidad", void 0);
__decorate([
    Expose({ name: 'Daily_Price' }),
    IsDefined({ message: () => { throw { status: 422, message: `Daily_Price is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Automovil.prototype, "Precio_Diario", void 0);
