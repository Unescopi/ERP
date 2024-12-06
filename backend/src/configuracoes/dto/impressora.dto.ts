import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum TipoImpressora {
  RECIBO = 'RECIBO',
  COZINHA = 'COZINHA',
  FISCAL = 'FISCAL'
}

export class ImpressoraDto {
  @IsString()
  nome: string;

  @IsEnum(TipoImpressora)
  tipo: TipoImpressora;

  @IsString()
  modelo: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  porta?: string;
}
