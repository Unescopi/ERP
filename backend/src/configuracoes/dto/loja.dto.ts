import { IsString, IsOptional, IsArray } from 'class-validator';

export class LojaDto {
  @IsString()
  nome: string;

  @IsString()
  cnpj: string;

  @IsString()
  endereco: string;

  @IsString()
  telefone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsArray()
  @IsOptional()
  horarioFuncionamento?: string[];

  @IsString()
  @IsOptional()
  logoUrl?: string;
}
