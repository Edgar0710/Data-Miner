import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FileService } from 'src/app/shared/services/file.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/userModel';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [FileService],
})
export class UploadFileComponent implements OnInit {
  selectedFile: File = null;
  user: UserModel = JSON.parse(localStorage.getItem('usuario'));
  nombre: String = this.user.us_nombre;
  lblFile: String = 'Sube tu archivo aquí';

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public fileService: FileService
  ) {
    //this.urlSegura = sanitizer.bypassSecurityTrustHtml(this.youtube);
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.lblFile = this.selectedFile.name;
  }

  onUpload(event: any) {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

    this.fileService.upload(fd).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
