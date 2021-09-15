import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LogingService } from "./login/login.service";
import { persona } from "./persona.model";

@Injectable()
export class DataServices {
  constructor(private httpClient: HttpClient, private loginService:LogingService) {}

  //Guardar Personas
  GuardarPersonas(persona: persona[]) {
    const token= this.loginService.getIdToken();
    this.httpClient
      .put(
        "https://listado-personas-22422-default-rtdb.firebaseio.com/datos.json?auth=" + token,
        persona
      )
      .subscribe(
        (response) => console.log("Resultado de guardar personas " + response),
        (error) => console.log("Error al guardar personas " + error)
      ); //siempre colocar al final de la url un nombre con extension json
  }

  //Regresa lo almacenado en la bdd
  CargarPersonas() {
    const token= this.loginService.getIdToken();
    return this.httpClient.get(
      "https://listado-personas-22422-default-rtdb.firebaseio.com/datos.json?auth=" + token
    ); //retorna un objeto tipo observable
    //concateno token para verificar autenticacion y permitir ver el listado de personas
  }

  modificarPersona(index: number, persona: persona) {
    const token= this.loginService.getIdToken();
    let url: string;
    url =
      "https://listado-personas-22422-default-rtdb.firebaseio.com/datos/" +
      index +
      ".json?auth=" + token;
    this.httpClient.put(url, persona).subscribe(
      (response) => console.log("resultado de modificar " + response),
      (error) => console.log("Error al modificar persona" + error)
    );
  }

  eliminarPersona(index: number) {
    const token= this.loginService.getIdToken();
    let url: string;
    url =
      "https://listado-personas-22422-default-rtdb.firebaseio.com/datos/" +
      index +
      ".json?auth=" + token;
    this.httpClient.delete(url).subscribe(
      (response) => console.log("resultado de eliminar " + response),
      (error) => console.log("Error al eliminat persona" + error)
    );
  }
}
