import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { UserModel } from 'src/app/shared/models/userModel';
import { FormModel } from 'src/app/shared/models/formModel';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/shared/services/display.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FileService, DisplayService],
})
export class RegisterComponent implements OnInit {
  public formModel: FormModel;
  user: UserModel = JSON.parse(localStorage.getItem('usuario'));
  constructor(public fileService: FileService, private router: Router, public displayservice: DisplayService) {
    this.formModel = new FormModel('', '', '');
  }


  ngOnInit() {
    this.showForms();
  }

  ngAfterViewInit(): void {


var $tableEncuestados=$("#table_encuestas");
console.log($tableEncuestados);
    $tableEncuestados.DataTable({

      "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "Todos"]],
      "language": {
    "url":"//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
      "paging":   false,
      "ordering": false,
      "info":     false,
      "lengthChange": false,
      "searching": false
  }
  );
  }
  public  showForms() {
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
  see(id: any) {
 //this.displayservice.setFormularioId(id);
 localStorage.setItem('formId', JSON.stringify(id));
    this.router.navigate(['display']);
  }
  edit(Id: any) {
    console.log(Id);
  }
  delete(Id: any) {
    console.log(Id);
  }


}
