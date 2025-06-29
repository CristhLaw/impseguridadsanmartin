export class Usuario {
  constructor(
    public idUsuario: number,
    public user: string,
    public estado: string,
    public token?: string  // ← esto lo hace opcional
  ) {}
}
