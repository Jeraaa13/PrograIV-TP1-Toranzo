export interface AhorcadoData {
  id?: number;
  created_at?: string;
  idUsuario: string | undefined;
  palabra: string;
  letrasUsadas: number;
  gano: boolean;
  tiempoSegundos: number;
  errores: number;
  puntaje: number;
}
