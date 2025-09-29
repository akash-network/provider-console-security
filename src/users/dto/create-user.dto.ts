export class CreateUserDto {
  readonly address: string;
  nonce: string = null;
  created_at?: Date;
  updated_at?: Date;
}
