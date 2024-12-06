import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodo: string;

  @Column('decimal')
  valor: number;

  @Column({ type: 'date' })
  data: Date;
}
