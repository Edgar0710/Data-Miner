import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {
    // this.urlSegura = sanitizer.bypassSecurityTrustHtml(this.youtube);
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    console.log(event);
  }
}
