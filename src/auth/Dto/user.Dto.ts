import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Broad } from "../../broad/schema/broad.schema";
import { ObjectId } from "mongoose";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: "Password must be at least 6 characters long and contain at least one letter and one number"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: "Password must be at least 6 characters long and contain at least one letter and one number"
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class findUserDto {
  _id: ObjectId;

  name: string;

  password: string;

  email: string;

  broads: Broad[];
}