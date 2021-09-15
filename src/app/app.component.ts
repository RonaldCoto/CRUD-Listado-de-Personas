import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import { LogingService } from "./login/login.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ListadoPersonas";
  
  constructor(private loginService:LogingService) {}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyABCCV2V1nxO1a_PonFDVpEdY8s4RpraXQ",
      authDomain: "listado-personas-22422.firebaseapp.com",
    });
  }
  
  isAutenticado(){
    return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logOut();
  }
}
