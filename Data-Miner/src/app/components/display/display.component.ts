import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Formulario } from 'src/app/shared/models/DetalleFormularioModel';
import { DisplayService } from 'src/app/shared/services/display.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers:[DisplayService],
})
export class DisplayComponent implements OnInit {
  public formulario: Formulario;
  public form_id : number;
  constructor(
 public displayservice:DisplayService
  ) { }

  ngOnInit(): void {
  this.displayservice.getDetailForms(6).subscribe(
    (response) => {
    this.formulario=JSON.parse(JSON.stringify(response)).result;
    console.log(this.formulario);
    },
    (error) => {
      console.log(error);
    }
  )
  }
}
