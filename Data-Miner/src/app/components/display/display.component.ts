import { ElementRef, Input } from '@angular/core';
import { Component, OnInit, Renderer2 } from '@angular/core';
import * as Chart from 'chart.js';
import { Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {
  Formulario,
  FormularioRespuesta,
} from 'src/app/shared/models/DetalleFormularioModel';
import { DisplayService } from 'src/app/shared/services/display.service';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  providers: [DisplayService],
})
export class DisplayComponent implements OnInit {
  formularioId: any;
  formId = JSON.parse(localStorage.getItem('formId'));
  public formulario: Formulario;
  public form_id: number;
  charts = [];
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private elementRef: ElementRef,
    public displayservice: DisplayService
  ) {}

  ngOnInit(): void {
    //this.formularioId = this.displayservice.getFormularioId();
    //console.log(this.formularioId);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
    };

    this.displayservice.getDetailForms(this.formId).subscribe(
      (response) => {
        this.formulario = JSON.parse(JSON.stringify(response)).result;
        console.log(this.formulario.respuestas[0].pr_pregunta);
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.createChartsData();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dtTrigger.unsubscribe();
  }

  createChartsData() {
    var graf = [];

    this.formulario.respuestas.forEach(function (element, index) {
      var labels = [];
      var datos = [];
      var total = element.respuestas.length;
      element.respuestas.forEach(function (respuesta, index) {
        labels.push(respuesta.rpe_valor);
        datos.push(respuesta.Total);
      });
      var pie = {
        title: 'Comportamiento de respuestas',
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cantidad de respuestas',
              data: datos,

              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            },
          ],
        },
        options: {
          title: {
            display: true,
          },
          animations: true,
          tooltips: {
            enabled: true,
          },
          legend: {
            display: true,
          },
          responsive: true,
        },
      };

      graf.push(pie);
    });

    this.createCharts(graf);
  }
  createCharts(pieData) {
    const canvas = document.getElementsByClassName('mycanvas');
    //console.log(pieData);
    for (var j = 0; j < canvas.length; j++) {
      const cv = <HTMLCanvasElement>canvas.item(j);
      const ctx = cv.getContext('2d');
      //console.log(ctx);
      var tempChart = new Chart(ctx, pieData[j]);
    }
  }
}
