import { EventEmitter, Injectable } from "@angular/core";
import { DataServices } from "./data.services";
import { LoggingService } from "./LoggingService.service";
import { persona } from "./persona.model";

@Injectable()
export class personasService {
  //arreglo de tipo persona(la clase modelo) se llena con la bdd en firebase
  personas: persona[] = [];

  saludar = new EventEmitter<number>(); //atributo para emitir un evento

  constructor(private loggingService: LoggingService, private dataServices:DataServices) {}
  
  setPersonas(personas:persona[]){ //servicio que llena el arreglo con datos de firebase
    this.personas=personas;
  }

  //retorna los datos cargados en el servicio data, que los trae de la bdd
  ObtenerPersonas(){
    return this.dataServices.CargarPersonas();
  }

  personaAgregada(persona: persona) {
    this.loggingService.enviaMensajeConsola("Agregamos persona " + persona.nombre);
    if(this.personas == null){ //si no hay datos en la bdd inicializamos el arreglo con un arreglo vacio
      this.personas=[];
    }
    this.personas.push(persona);
    this.dataServices.GuardarPersonas(this.personas); //mando al servicio el arreglo de personas
  }

  encontrarPersona(index: number) {
    //recibo parametro del formulario
    let persona: persona = this.personas[index]; //almaceno en la variable persona el elemento con el indice "index" proveniente de formulario
    return persona;
  }

  modificarPersona(index: number, persona: persona) {
    //recibo parametros del formulario

    let persona1 = this.personas[index]; //almaceno el objeto del indice proporcionado
    persona1.nombre = persona.nombre; //elemento del arreglo(persona1) cambia por los valores pasados por parametro
    persona1.apellido = persona.apellido;
    this.dataServices.modificarPersona(index,persona);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1); //eliminar UN elemento del arreglo segun el index
    this.dataServices.eliminarPersona(index);

    //para regenerar indices y que no queden vacios por ejem 0 , 1 , 5 y quede 0,1,2,3,4,5 
    this.modificarPersonas();
  }

  modificarPersonas(){
    if(this.personas!=null){
      this.dataServices.GuardarPersonas(this.personas);
    }
  }
}
