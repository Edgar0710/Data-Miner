import { Encuestado } from "./EncuestadoModel";
import { RespuestaRespuesta } from "./RespuestaModel";

export interface Formulario {
  fr_nombre:      string;
  fr_descripcion: string;
  respuestas:     FormularioRespuesta[];
}

export interface FormularioRespuesta {
  pr_id:           number;
  pr_pregunta:     string;
  totalRespuestas: number;
  encuestados:     Encuestado[];
  respuestas:      RespuestaRespuesta[];
}
