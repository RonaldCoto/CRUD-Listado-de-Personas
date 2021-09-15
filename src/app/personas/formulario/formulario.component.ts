import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoggingService } from "../../LoggingService.service";
import { persona } from "../../persona.model";
import { personasService } from "../../personas.service";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
  //providers: [LoggingService]
})
export class FormularioComponent implements OnInit {
  //moviendo datos del componente hijo al padre
  @Output() personaCreada = new EventEmitter<persona>();
  //declaracion de variables
  nombreInput: string = "";
  apellidoInput: string = "";
  index: number;
  modoEdicion: number;
  //@ViewChild("nombreref") nombre: ElementRef;
  //@ViewChild("apellidoref") apellido: ElementRef;

  constructor(
    private loggingService: LoggingService,
    private personasServices: personasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    personasServices.saludar.subscribe((indice: number) =>
      alert("El indice es " + indice)
    );
  }
  ngOnInit() {
    this.index = this.route.snapshot.params["id"]; //recupera el id de la ruta /personas/:id
    this.modoEdicion = +this.route.snapshot.queryParams["modoEdicion"]; //el + convierte de string a entero
    //dentro del queryparams está el parámetro de cada elemento de la lista -> ir a persona.html

    //Otra forma de hacer con queryParams
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      let persona: persona = this.personasServices.encontrarPersona(this.index);
      this.nombreInput = persona.nombre; //asignando al input nombre el nombre que traigo del servicio
      this.apellidoInput = persona.apellido;
    }

    //Este es el mas recomendable en lugar de quey params
    /*if (this.index != null) {
      //verificar si existe
      let persona: persona = this.personasServices.encontrarPersona(this.index);
      this.nombreInput = persona.nombre; //asignando al input nombre el nombre que traigo del servicio
      this.apellidoInput = persona.apellido;
    }*/
  }

  onGuardarPersona() {
    let persona1 = new persona(this.nombreInput, this.apellidoInput); //objeto para meter los valores de los input
    //usnado queryParasm
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personasServices.modificarPersona(this.index, persona1); //modificar
      this.router.navigate(["/personas"]);
    } else {
      this.personasServices.personaAgregada(persona1); //agregar
      this.router.navigate(["/personas"]);
    }

    //Se recomienda usar esta forma en lugar de queryParams
    /*if (this.index) {
      //otra forma de verificar si existe
      this.personasServices.modificarPersona(this.index, persona1); //modificar
      this.router.navigate(["/personas"]);
    } else {
      this.personasServices.personaAgregada(persona1); //agregar
      this.router.navigate(["/personas"]);
    }*/
    //this.loggingService.enviaMensajeConsola("Enviamos persona " + persona1.nombre + " " + persona1.apellido); //consumiendo servicio
    //this.personas.push(persona1); //agregando el objeto con los valores al arreglo
    //this.personaCreada.emit(persona1);
  }

  eliminarPersona() {
    if (this.index != null) {
      this.personasServices.eliminarPersona(this.index);
    }
    this.router.navigate(["personas"]);
  }
}
