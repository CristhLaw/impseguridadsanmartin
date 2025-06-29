import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';

import { Bus } from '../../../modelo/Bus';
import { Repuestos } from '../../../modelo/Repuestos';
import { Herramientas } from '../../../modelo/Herramientas';
import { SolicitudRepuesto } from '../../../modelo/Solicitudrepuesto';

import { BusService } from '../../../servicio/bus.service';
import { RepuestosService } from '../../../servicio/repuestos.service';
import { HerramientasService } from '../../../servicio/herramientas.service';
import { SolicitudrepuestoService } from '../../../servicio/solicitudrepuesto.service';

import { forkJoin } from 'rxjs';
import {MatFormField} from '@angular/material/input';

@Component({
  selector: 'app-formsolicitar',
  standalone: true,
  templateUrl: './formsolicitar.component.html',
  styleUrls: ['./formsolicitar.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TextareaModule,
    MatFormField
  ],
})
export class FormsolicitarComponent implements OnInit {
  value: string = '';

  // Buses
  buses: Bus[] = [];
  selectedBus: Bus | null = null;

  // Repuestos y Herramientas
  repuestosCombinados: Repuestos[] = [];
  herramientasCombinadas: Herramientas[] = [];

  repuestoSeleccionado: Repuestos | null = null;
  herramientaSeleccionada: Herramientas | null = null;

  constructor(
    private busService: BusService,
    private repuestosService: RepuestosService,
    private herramientasService: HerramientasService,
    private solicitudService: SolicitudrepuestoService
  ) {}

  ngOnInit(): void {
    this.getBuses();
    this.cargarOpcionesCombinadas();
  }

  getBuses(): void {
    this.busService.findAll().subscribe({
      next: (data: Bus[]) => (this.buses = data),
      error: (err) => console.error('Error al cargar buses:', err),
    });
  }

  cargarOpcionesCombinadas(): void {
    forkJoin([
      this.repuestosService.findAll(),
      this.herramientasService.findAll()
    ]).subscribe({
      next: ([repuestos, herramientas]) => {
        this.repuestosCombinados = repuestos;
        this.herramientasCombinadas = herramientas;
      },
      error: (err) => console.error('Error al cargar repuestos y herramientas:', err)
    });
  }

  guardarSolicitud(): void {
    if (!this.selectedBus || !this.value || !this.repuestoSeleccionado || !this.herramientaSeleccionada) {
      alert('Completa todos los campos antes de guardar.');
      return;
    }

    const solicitud: SolicitudRepuesto = {
      idSolicitud: 0,
      usuario: 4,  // ← usa usuario real si tienes autenticación
      bus: this.selectedBus.idbus,
      descripcionDeFalla: this.value,
      repuestos: this.repuestoSeleccionado.idRepuestos,  // Cambiar esto
      herramientas: this.herramientaSeleccionada.idHerramienta,
      estado: 'PENDIENTE',
      cantidad: 1
    };
console.log(solicitud);

    this.solicitudService.save(solicitud).subscribe({
      next: () => {
        alert('Solicitud registrada correctamente');
        // Limpiar formulario
        this.selectedBus = null;
        this.value = '';
        this.repuestoSeleccionado = null;
        this.herramientaSeleccionada = null;
      },

      error: (err) => {
        console.error('Error al guardar la solicitud:', err);
        alert('Error al guardar solicitud');
      }
    });
  }
}
