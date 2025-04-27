export interface usuario {
    id?: number;
    nombre: string;
    apellidos: string;
    mail: string;
    password: string;
    rolId?: number;
    rolNombre?: string;
}