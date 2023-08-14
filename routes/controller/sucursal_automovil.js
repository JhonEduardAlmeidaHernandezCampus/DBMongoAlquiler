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
export class Sucursal_Automovil {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Sucursal_ID_Sucursal = 0;
        this.ID_Automovil_ID_Automovil = 0;
        this.Cantidad_Disponible = 0;
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
], Sucursal_Automovil.prototype, "ID_Sucursal_ID_Sucursal", void 0);
__decorate([
    Expose({ name: 'ID_Car' }),
    IsDefined({ message: () => { throw { status: 422, message: `ID_Car is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Sucursal_Automovil.prototype, "ID_Automovil_ID_Automovil", void 0);
__decorate([
    Expose({ name: 'Quantity_Available' }),
    IsDefined({ message: () => { throw { status: 422, message: `Quantity_Available is required` }; } }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value);
    else
        throw { status: 400, message: `Error en los parametros` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Sucursal_Automovil.prototype, "Cantidad_Disponible", void 0);
