import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { persona } from "../persona.model";
import { personasService } from "../personas.service";

@Component({
  selector: "app-personas",
  templateUrl: "./personas.component.html",
  styleUrls: ["./personas.component.css"],
})
export class PersonasComponent implements OnInit {
  constructor(
    private personasServices: personasService,
    private router: Router
  ) {}

  //arreglo de tipo persona(la clase modelo)
  personas: persona[] = [];

  ngOnInit(): void {
    //this.personas = this.personasServices.personas; //esta se usa para cargar los datos del arreglo
    this.personasServices.ObtenerPersonas().subscribe((personas: persona[]) => {
      this.personas = personas;
      this.personasServices.setPersonas(personas); //lleno con el parametro personas del subscribe para llenar el arreglo personas del servicio
    });
  }

  agregar() {
    this.router.navigate(["personas/agregar"]);
  }
}
