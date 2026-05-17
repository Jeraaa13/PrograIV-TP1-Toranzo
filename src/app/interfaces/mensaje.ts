export interface Mensaje {
  id?: number;
  idUsuario: string | undefined;
  mensaje: string;
  created_at?: string;
}
