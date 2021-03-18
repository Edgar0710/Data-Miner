import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FileService } from 'src/app/shared/services/file.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/userModel';
import { FileUploadModel } from 'src/app/shared/models/fileUploadModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [FileService],
})
export class UploadFileComponent implements OnInit {
  selectedFile: File = null;
  user: UserModel = JSON.parse(localStorage.getItem('usuario'));
  nombre: string = this.user.us_nombre;
  lblFile: string = 'Sube tu archivo aquí';
  public lblUpload = '';
  public fileUploadModel: FileUploadModel;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public fileService: FileService,
    private router: Router
  ) {
    this.fileUploadModel = new FileUploadModel('', '');

    //this.urlSegura = sanitizer.bypassSecurityTrustHtml(this.youtube);
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.lblFile = this.selectedFile.name;
  }

  onUpload(event: any) {
    if (this.selectedFile == null) {
      this.lblUpload = 'Selecciona un archivo';
      return;
    } else {
      var str = this.selectedFile.name;
      var re = /.xls/gi;
      if (str.search(re) == -1) {
        this.lblUpload = 'Selecciona un archivo Excel';
        return;
      }
    }

    if (this.fileUploadModel.nombre == '') {
      this.lblUpload = 'Agrega un nombre para tu archivo';
      return;
    }
    if (this.fileUploadModel.descripcion == '') {
      this.lblUpload = 'Agrega una descripción';
      return;
    }

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.fileService.upload(fd, this.fileUploadModel).subscribe(
      (response) => {
        this.lblUpload = 'Archivo agregado correctamente';
        this.lblFile = 'Sube tu archivo aquí';
        this.selectedFile = null;
        this.fileUploadModel.nombre = '';
        this.fileUploadModel.descripcion = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showFiles() {
    this.router.navigate(['register']);
  }

  ngOnInit(): void {}
}
