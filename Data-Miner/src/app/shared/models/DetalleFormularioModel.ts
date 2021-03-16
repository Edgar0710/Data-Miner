import { Encuestado } from "./EncuestadoModel";
import {  RespuestaRespuesta } from "./RespuestaModel";

export class Formulario {
  constructor( fr_nombre: string,
   fr_descripcion: string,
   respuestas:   FormularioRespuesta[]){

   }
 }

 export class FormularioRespuesta {
   constructor(pr_id: number,
     pr_pregunta:     string,
     totalRespuestas: number,
     encuestados:     Encuestado[],
     respuestas:      RespuestaRespuesta[]){}

 }
