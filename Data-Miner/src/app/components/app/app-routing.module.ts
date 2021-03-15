import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { DisplayComponent } from '../display/display.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'upload',
    component: UploadFileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'display',
    component: DisplayComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},

  { path: 'notFound', component: NotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
