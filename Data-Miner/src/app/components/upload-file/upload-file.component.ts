import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  youtube = 'https://www.youtube.com/embed/VAkio68d51A';

  urlSegura;
  nombre = '<script>alert("Hello")</script>';

  constructor(private sanitizer: DomSanitizer) {
    this.urlSegura = sanitizer.bypassSecurityTrustHtml(this.youtube);
  }

  ngOnInit(): void {}
}
