import { IsString, IsNumber, IsArray, IsObject, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum PeriodoAnalise {
  HORA = 'HORA',
  DIA = 'DIA',
  SEMANA = 'SEMANA',
  MES = 'MES',
  ANO = 'ANO'
}

export enum CategoriaKPI {
  VENDAS = 'VENDAS',
  FINANCEIRO = 'FINANCEIRO',
  OPERACIONAL = 'OPERACIONAL',
  CLIENTE = 'CLIENTE',
  ESTOQUE = 'ESTOQUE'
}

export class AnaliseVendasDto {
  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;

  @IsEnum(PeriodoAnalise)
  agrupamento: PeriodoAnalise;

  @IsOptional()
  @IsArray()
  produtos?: string[];

  @IsOptional()
  @IsArray()
  categorias?: string[];
}

export class PrevisaoVendasDto {
  @IsDateString()
  dataInicio: string;

  @IsNumber()
  periodoPrevisao: number; // número de dias

  @IsOptional()
  @IsArray()
  produtos?: string[];
}

export class RelatorioPersonalizadoDto {
  @IsString()
  titulo: string;

  @IsArray()
  metricas: string[];

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;

  @IsEnum(PeriodoAnalise)
  agrupamento: PeriodoAnalise;

  @IsOptional()
  @IsObject()
  filtros?: Record<string, any>;
}

export class KPIConfigDto {
  @IsString()
  nome: string;

  @IsEnum(CategoriaKPI)
  categoria: CategoriaKPI;

  @IsNumber()
  meta: number;

  @IsOptional()
  @IsObject()
  configuracao?: Record<string, any>;
}

export class AlertaDto {
  @IsString()
  tipo: string;

  @IsObject()
  condicoes: Record<string, any>;

  @IsArray()
  destinatarios: string[];

  @IsOptional()
  @IsObject()
  configuracaoNotificacao?: Record<string, any>;
}
