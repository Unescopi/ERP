import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class DashboardMetricsDto {
  @IsNumber()
  vendasDiarias: number;

  @IsNumber()
  ticketMedio: number;

  @IsNumber()
  clientesNovos: number;

  @IsArray()
  produtosMaisVendidos: Array<{
    produto: string;
    quantidade: number;
    receita: number;
  }>;

  @IsArray()
  horariosMovimento: Array<{
    hora: string;
    movimento: number;
  }>;

  @IsNumber()
  taxaOcupacao: number;

  @IsNumber()
  satisfacaoCliente: number;
}

export class PrevisaoDemandaDto {
  @IsString()
  data: string;

  @IsArray()
  previsoes: Array<{
    produto: string;
    quantidadePrevista: number;
    confianca: number;
  }>;
}

export class RelatorioPersonalizadoDto {
  @IsString()
  titulo: string;

  @IsString()
  periodo: string;

  @IsArray()
  metricas: string[];

  @IsOptional()
  @IsArray()
  filtros?: Array<{
    campo: string;
    valor: any;
  }>;
}
