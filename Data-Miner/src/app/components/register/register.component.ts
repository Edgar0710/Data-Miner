import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { UserModel } from 'src/app/shared/models/userModel';
import { FormModel } from 'src/app/shared/models/formModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FileService],
})
export class RegisterComponent implements OnInit {
  public formModel: FormModel;
  user: UserModel = JSON.parse(localStorage.getItem('usuario'));
  constructor(public fileService: FileService) {
    this.formModel = new FormModel('', '', '');
  }

  ngOnInit() {
    this.showForms();
  }

  public showForms() {
    this.fileService.getForms().subscribe(
      (response) => {
        this.fileService.forms = JSON.parse(JSON.stringify(response)).result;
        console.log(this.fileService.forms);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  see(Id: any) {
    console.log(Id);
  }
  edit(Id: any) {
    console.log(Id);
  }
  delete(Id: any) {
    console.log(Id);
  }
}
