import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schema/user.schema";

export class CreateBroadDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  users: User;
}

export class UpdateBroadDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  users: User;
}