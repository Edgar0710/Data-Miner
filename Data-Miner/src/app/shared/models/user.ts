export class User {
  constructor(
    public nombre: String,
    public apellido_paterno: String,
    public apellido_materno: String,
    public correo: String,
    public password: String,
    public tipo_cuenta: String
  ) {}
}
