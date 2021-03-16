import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Formulario,FormularioRespuesta } from 'src/app/shared/models/DetalleFormularioModel';
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
  charts = [];
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
 public displayservice:DisplayService
 ) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  this.displayservice.getDetailForms(6).subscribe(
    (response) => {
    this.formulario=JSON.parse(JSON.stringify(response)).result;
    console.log(this.formulario.respuestas[0].pr_pregunta);
    this.dtTrigger.next();
    },
    (error) => {
      console.log(error);
    }
  );

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dtTrigger.unsubscribe();
  }

  createChartsData(){

this.formulario.respuestas.forEach(element => {
  var labels=  [];
  var datos=[];
  element.respuestas.forEach(respuesta => {
   labels.push(respuesta.rpe_valor);
   datos.push(respuesta.Total)
  });
  var pie={
    type: 'doughnut',
    data: {
      labels:labels,
      datasets: [
        {

          data: datos
        }
      ]
    },
    options: {
      title: {
        display: false
      },
      animations: true,
      tooltips: {
        enabled: true
       },
       legend: {
        display: true
      }
    }
  }
  //let htmlRef = this.elementRef.nativeElement.select(`#canvas`+element.pr_id);
});
  }


}
