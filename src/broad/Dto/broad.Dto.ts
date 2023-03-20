import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schema/user.schema";
import { List } from "../../list/schema/list.schema";

export class CreateBroadDto {
  @IsNotEmpty()
  @IsString()

  title: string;

  users?: User;
}

export class UpdateBroadDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  users: User;

  lists: List[];
}

export class BoardFindDto {
  _id: string;
  title: string;
  user: User;
  lists: List[];
}