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
export class Empleado {
    constructor(data) {
        Object.assign(this, data);
        this._ID_Empleado = 0;
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Cargo = "";
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
], Empleado.prototype, "_ID_Empleado", void 0);
__decorate([
    Expose({ name: 'Name' }),
    IsDefined({ message: () => { throw { status: 422, message: `Name is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Empleado.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'Surname' }),
    IsDefined({ message: () => { throw { status: 422, message: `Surname is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Empleado.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'Identification' }),
    IsDefined({ message: () => { throw { status: 422, message: `Identification is required` }; } }),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Empleado.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'Address' }),
    IsDefined({ message: () => { throw { status: 422, message: `Address is required` }; } }),
    Transform(({ value }) => { if (/^[a-zA-Z0-9\s\W]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Empleado.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'Phone' }),
    IsDefined({ message: () => { throw { status: 422, message: `Phone is required` }; } }),
    Transform(({ value }) => { if (/^[0-9\s\W]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Empleado.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'Position' }),
    IsDefined({ message: () => { throw { status: 422, message: `Position is required` }; } }),
    Transform(({ value }) => { if (/^[a-z-A-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Empleado.prototype, "Cargo", void 0);
