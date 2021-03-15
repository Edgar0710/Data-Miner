import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/shared/models/loginModel';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public loginModel: LoginModel;
  public userModel: UserModel;
  constructor(public _userService: UserService, private router: Router) {
    this.loginModel = new LoginModel('', '');
    this.userModel = new UserModel(null, '', '', '', null, '', '');
  }

  ngOnInit(): void {}

  public btnLogin() {
    this._userService.login(this.loginModel).subscribe(
      (response) => {
        this._userService.users = JSON.parse(JSON.stringify(response));

        this.userModel = JSON.parse(JSON.stringify(response)).result;
         localStorage.setItem('usuario',JSON.stringify(this.userModel));
        this.router.navigate(['upload']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
