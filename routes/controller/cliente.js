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
export class Cliente {
    constructor(data) {
        Object.assign(this, data);
        this._ID_Cliente = 0;
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Email = "";
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
            throw { status: 400, message: `Error en los parametros 1` };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Cliente.prototype, "_ID_Cliente", void 0);
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
], Cliente.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'Surname' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `Surname is required` };
        }
        if (/^[a-z-A-Z\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Cliente.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'Identification' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `Identification is required` };
        }
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Cliente.prototype, "DNI", void 0);
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
], Cliente.prototype, "Direccion", void 0);
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
], Cliente.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'Email' }),
    Transform(({ value }) => {
        if (value === undefined || value === null) {
            throw { status: 422, message: `Email is required` };
        }
        if (/\S+@\S+\.\S+/.test(value))
            return value;
        else
            throw { status: 400, message: `Error en los parametros` };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Cliente.prototype, "Email", void 0);
