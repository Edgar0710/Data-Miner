export class UserModel {
  constructor(
    public us_id: Number,
    public us_nombre: String,
    public us_apellidos: String,
    public us_email: String,
    public ro_id: Number,
    public ro_nombre: String,
    public us_athorization: String
  ) {}
}
