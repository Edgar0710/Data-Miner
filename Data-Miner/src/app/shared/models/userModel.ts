export class UserModel {
  constructor(
    public us_id: Number,
    public us_nombre: string,
    public us_apellidos: string,
    public us_email: string,
    public ro_id: Number,
    public ro_nombre: string,
    public us_athorization: string
  ) {}
}
