import { IsNumber, IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class PedidoAutomaticoDto {
  @IsString()
  fornecedorId: string;

  @IsArray()
  produtos: {
    produtoId: string;
    quantidadeMinima: number;
    quantidadeMaxima: number;
    pontoRessuprimento: number;
  }[];

  @IsNumber()
  frequenciaEmDias: number;

  @IsBoolean()
  ativo: boolean;

  @IsOptional()
  @IsArray()
  diasEntrega?: string[]; // dias da semana preferidos

  @IsOptional()
  @IsNumber()
  valorMinimoPedido?: number;

  @IsOptional()
  @IsArray()
  notificacoes?: string[]; // emails para notificação
}
