import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PagamentoDto {
  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  metodo: string;

  @IsNotEmpty()
  @IsNumber()
  vendaId: number;
}
