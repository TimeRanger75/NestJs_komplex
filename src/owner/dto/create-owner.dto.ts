import { IsBoolean, IsDefined, IsNumber, IsString } from "class-validator";

export class CreateOwnerDto {

  @IsDefined()
  @IsString()
  fullName: string;

  @IsDefined()
  @IsBoolean()
  business: boolean;
}
