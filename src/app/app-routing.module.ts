import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PersonasComponent } from "./personas/personas.component";
import { FormularioComponent } from "./personas/formulario/formulario.component";
import { ErrorComponent } from "./error/error.component";
import { LoginComponent } from "./login/login.component";
import { LoginGuardian } from "./login/login.guardian.service";

const routes: Routes = [
  { path: "", component: PersonasComponent, canActivate: [LoginGuardian] }, //ruta por defecto
  {
    path: "personas",
    component: PersonasComponent,
    canActivate: [LoginGuardian],
    children: [
      { path: "agregar", component: FormularioComponent },
      { path: ":id", component: FormularioComponent }, //ruta para editar elemento
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "**", component: ErrorComponent }, //ruta de error, o sea cualquier otra ruta y siempre se debe colocar de ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
