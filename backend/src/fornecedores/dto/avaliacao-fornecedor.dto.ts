import { IsNumber, IsString, IsDate, IsOptional, Min, Max } from 'class-validator';

export class AvaliacaoFornecedorDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  qualidadeProdutos: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  pontualidadeEntrega: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  atendimento: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  precos: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  condicoesComerciais: number;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsDate()
  dataAvaliacao: Date;

  @IsString()
  avaliadorId: string;
}
