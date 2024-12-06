import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('analytics')
export class Analytic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column('jsonb')
  dados: any;

  @CreateDateColumn()
  dataCriacao: Date;

  @Column()
  periodo: string; // diario, semanal, mensal

  @Column('jsonb', { nullable: true })
  metadados: any;
}

@Entity('metricas_tempo_real')
export class MetricaTempoReal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('float')
  valor: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column('jsonb', { nullable: true })
  contexto: any;
}

@Entity('kpis')
export class KPI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column('float')
  valor: number;

  @Column('float')
  meta: number;

  @CreateDateColumn()
  dataAtualizacao: Date;

  @Column('jsonb')
  historico: any[];
}
