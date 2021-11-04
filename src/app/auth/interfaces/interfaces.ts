export interface AuthResponse{
    ok: boolean,
    msj?: string,
    uid?: string,
    email?:string,
    name?:string,
    token?: string
}
export interface Usuario{
    uid:string;
    name:string;
    email?:string;
}