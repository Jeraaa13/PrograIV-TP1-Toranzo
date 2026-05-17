export interface GuitarheroData {
  id?: number;
  created_at?: string;
  idUsuario: string | undefined;
  puntaje: number;
  gano: boolean;
  tiempo: number;
  notasAcertadas: number;
  notasErradas: number;
}
