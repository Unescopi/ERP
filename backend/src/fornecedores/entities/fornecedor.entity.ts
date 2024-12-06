import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CategoriaFornecedor, StatusFornecedor } from '../dto/create-fornecedor.dto';

@Entity('fornecedores')
export class Fornecedor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  razaoSocial: string;

  @Column()
  cnpj: string;

  @Column()
  inscricaoEstadual: string;

  @Column('simple-array')
  categorias: CategoriaFornecedor[];

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  contatoPrincipal: string;

  @Column({ nullable: true })
  contatoSecundario: string;

  @Column()
  prazoEntregaPadrao: number;

  @Column()
  prazoPagementoPadrao: number;

  @Column()
  entregaPropria: boolean;

  @Column('decimal')
  valorMinimoCompra: number;

  @Column('simple-array', { nullable: true })
  certificacoes: string[];

  @Column({
    type: 'enum',
    enum: StatusFornecedor,
    default: StatusFornecedor.EM_ANALISE
  })
  status: StatusFornecedor;

  @Column('simple-array', { nullable: true })
  areasAtendidas: string[];

  @Column('jsonb', { nullable: true })
  condicoesEspeciais: {
    tipo: string;
    descricao: string;
    valor: number;
  }[];

  @Column('jsonb', { default: [] })
  avaliacoes: {
    qualidadeProdutos: number;
    pontualidadeEntrega: number;
    atendimento: number;
    precos: number;
    condicoesComerciais: number;
    observacoes?: string;
    dataAvaliacao: Date;
    avaliadorId: string;
  }[];

  @Column('decimal', { default: 0 })
  mediaAvaliacao: number;

  @Column('jsonb', { nullable: true })
  pedidosAutomaticos: {
    produtos: {
      produtoId: string;
      quantidadeMinima: number;
      quantidadeMaxima: number;
      pontoRessuprimento: number;
    }[];
    frequenciaEmDias: number;
    ativo: boolean;
    diasEntrega?: string[];
    valorMinimoPedido?: number;
    notificacoes?: string[];
  }[];

  @Column('jsonb', { default: [] })
  historicoPrecos: {
    produtoId: string;
    preco: number;
    data: Date;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('jsonb', { default: {} })
  metadados: {
    ultimaCompra?: Date;
    totalCompras?: number;
    pontuacao?: number;
    observacoes?: string[];
  };
}
