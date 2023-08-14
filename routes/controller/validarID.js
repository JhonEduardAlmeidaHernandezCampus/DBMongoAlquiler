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
export class validarID {
    constructor(_ID_Alquiler, _ID_Automovil, _ID_Cliente, _ID_Empleado, ID_Registro, ID_Reserva, ID_Sucursal_ID_Sucursal, _ID_Sucursal) {
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
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "_ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (/^[0-9\w]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "_ID_Automovil", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "_ID_Cliente", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "_ID_Empleado", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (/^[a-zA-Z\s]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], validarID.prototype, "Cargo", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "ID_Registro", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "ID_Reserva", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "ID_Sucursal_ID_Sucursal", void 0);
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validarID.prototype, "_ID_Sucursal", void 0);
