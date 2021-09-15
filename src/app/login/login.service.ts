import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/auth";

@Injectable()
export class LogingService {
  token: string;

  constructor(private router: Router) {}

  login(email: string, password: string) {
    const auth = firebase.getAuth();
    firebase
      .signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        auth.currentUser.getIdToken().then((token) => {
          this.token = token;
          this.router.navigate(["/"]); //redireccion a la pagina de inicio
        });
      });
  }

  getIdToken() {
    return this.token;
  }

  isAutenticado() {
    return this.token != null;
  }

  logOut() {
    const auth = firebase.getAuth();
    auth.signOut().then(() => {
      this.token = null;
      this.router.navigate(["login"]);
    }).catch(error=>console.log("Error de log Out: " + error));
  }
}
