export interface PreguntadosData {
  id?: number;
  created_at?: string;
  idUsuario: string | undefined;
  puntaje: number;
  tiempoSegundos: number;
  gano: boolean;
}
