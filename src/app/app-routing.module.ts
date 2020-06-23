import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AreaListComponent } from "./area/area-list.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./auth/login.component";
import { SigninComponent } from "./auth/signin.component";


const routes: Routes = [
  { path: "", component: AreaListComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signin", component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
