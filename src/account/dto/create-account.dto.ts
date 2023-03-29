import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsDefined()
  @IsString()
  accountNumber: string;

  @IsDefined()
  @IsNumber()
  balance: number;
}
