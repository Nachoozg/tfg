export interface partido {
    id?: number;
    fecha: Date;
    lugar: string;
    detalles: string;
    localId: number;
    visitanteId: number;
    resultadoLocal?: number;
    resultadoVisitante?: number;
    lat?: number;
    lng?: number;
    nombreLocal?: string; 
    nombreVisitante?: string;  
}