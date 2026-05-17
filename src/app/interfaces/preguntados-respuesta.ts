import { Pregunta } from './pregunta';

export interface PreguntadosRespuesta {
  response_code: number;
  results: Pregunta[];
}
