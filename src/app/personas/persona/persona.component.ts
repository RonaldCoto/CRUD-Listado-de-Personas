import { Component, Input, OnInit } from "@angular/core";
import { persona } from "../../persona.model";
import { personasService } from "../../personas.service";

@Component({
  selector: "app-persona",
  templateUrl: "./persona.component.html",
  styleUrls: ["./persona.component.css"],
})
export class PersonaComponent implements OnInit {
  //recibiendo los valores del componente padre
  @Input() persona: persona;
  @Input() indice: number;

  constructor(private personasService:personasService) {}

  ngOnInit(): void {}

  EmitirSaludo(){
    this.personasService.saludar.emit(this.indice);
  }
}
