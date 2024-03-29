import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  index_broad: number;

  @IsNotEmpty()
  broad: string;
}