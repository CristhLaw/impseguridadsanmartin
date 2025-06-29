import { Bus } from './Bus';
import { Repuestos } from './Repuestos';
import { Herramientas } from './Herramientas';
import { Usuario } from './Usuario';

export class SolicitudRepuesto {
  constructor(
    public idSolicitud: number,
    public usuario: number,                   // ✅ objeto completo
    public bus: number,
    public descripcionDeFalla: string,
    public repuestos: number,               // ✅ objeto único
    public herramientas: number,         // ✅ objeto único
    public estado: string,
    public cantidad: number
  ) {}
}
export class SolicitudRepuestoRepuesto {
  constructor(
    public idSolicitud: number,
    public usuario: Usuario,                   // ✅ objeto completo
    public bus: Bus,
    public descripcionDeFalla: string,
    public repuestos: Repuestos,               // ✅ objeto único
    public herramientas: Herramientas,         // ✅ objeto único
    public estado: string,
    public cantidad: number
  ) {}
}
