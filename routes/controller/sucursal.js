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
export class Sucursal {
    constructor(data) {
        Object.assign(this, data);
        this._ID_Sucursal = 0;
        this.Nombre = "";
        this.Direccion = "";
        this.Telefono = "";
    }
}
__decorate([
    Expose({ name: 'ID' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `ID is required` };
        }
        if (Math.floor(value) && typeof value == "number")
            return Math.floor(value);
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Sucursal.prototype, "_ID_Sucursal", void 0);
__decorate([
    Expose({ name: 'Name' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `Name is required` };
        }
        if (/^[a-z-A-Z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Sucursal.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'Address' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `Address is required` };
        }
        if (/^[a-zA-Z0-9\s\W]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Sucursal.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'Phone' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `Phone is required` };
        }
        if (/^[0-9\s\W]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Sucursal.prototype, "Telefono", void 0);
