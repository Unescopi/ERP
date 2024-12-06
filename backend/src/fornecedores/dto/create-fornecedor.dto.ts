import { IsString, IsEmail, IsOptional, IsArray, IsNumber, IsEnum, IsBoolean } from 'class-validator';

export enum CategoriaFornecedor {
  ALIMENTOS = 'ALIMENTOS',
  BEBIDAS = 'BEBIDAS',
  EMBALAGENS = 'EMBALAGENS',
  LIMPEZA = 'LIMPEZA',
  EQUIPAMENTOS = 'EQUIPAMENTOS',
  OUTROS = 'OUTROS'
}

export enum StatusFornecedor {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  EM_ANALISE = 'EM_ANALISE',
  BLOQUEADO = 'BLOQUEADO'
}

export class CreateFornecedorDto {
  @IsString()
  nome: string;

  @IsString()
  razaoSocial: string;

  @IsString()
  cnpj: string;

  @IsString()
  inscricaoEstadual: string;

  @IsEnum(CategoriaFornecedor, { each: true })
  @IsArray()
  categorias: CategoriaFornecedor[];

  @IsString()
  endereco: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  cep: string;

  @IsString()
  telefone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  contatoPrincipal: string;

  @IsString()
  @IsOptional()
  contatoSecundario?: string;

  @IsNumber()
  prazoEntregaPadrao: number;

  @IsNumber()
  prazoPagementoPadrao: number;

  @IsBoolean()
  entregaPropria: boolean;

  @IsNumber()
  valorMinimoCompra: number;

  @IsArray()
  @IsOptional()
  certificacoes?: string[];

  @IsEnum(StatusFornecedor)
  status: StatusFornecedor;

  @IsOptional()
  @IsArray()
  areasAtendidas?: string[];

  @IsOptional()
  @IsArray()
  condicoesEspeciais?: {
    tipo: string;
    descricao: string;
    valor: number;
  }[];
}
