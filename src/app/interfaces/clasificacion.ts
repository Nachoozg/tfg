export interface clasificacion {
  equipoId: number;
  nombreEquipo: string;
  partidosJugados: number;
  victorias: number;
  derrotas: number;
  puntos: number;
  ultimos5?: ('G' | 'P' | '?')[];
}