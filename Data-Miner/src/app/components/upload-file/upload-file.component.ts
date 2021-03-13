import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [UserService],
})
export class UploadFileComponent implements OnInit {
  selectedFile: File = null;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public _userService: UserService
  ) {
    //this.urlSegura = sanitizer.bypassSecurityTrustHtml(this.youtube);
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(event: any) {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);

    this._userService.upload(fd).subscribe(
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
