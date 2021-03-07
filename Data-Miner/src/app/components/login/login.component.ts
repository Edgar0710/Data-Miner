import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public loginModel: LoginModel;
  constructor(public _userService: UserService, private router: Router) {
    this.loginModel = new LoginModel('', '');
  }

  ngOnInit(): void {}

  public btnLogin() {
    this._userService.login(this.loginModel).subscribe(
      (response) => {
        console.log(response);

        this._userService.users = JSON.parse(JSON.stringify(response)).users;
        this.router.navigate(['upload']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

      //  var jsonObject = JSON.parse(JSON.stringify(response));
        //let nombre = jsonObject.Result[0].cUSU_Nombre;
        // let id = jsonObject.Result[0].cUSU_Id;
        // let correo = jsonObject.Result[0].cUSU_Correo;
