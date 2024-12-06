import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async update(id: number, updateEstoqueDto: UpdateEstoqueDto): Promise<Produto> {
    await this.produtoRepository.update(id, updateEstoqueDto);
    return this.produtoRepository.findOneBy({ id });
  }

  async updateAlert(id: number, updateEstoqueDto: UpdateEstoqueDto): Promise<Produto> {
    await this.produtoRepository.update(id, updateEstoqueDto);
    return this.produtoRepository.findOneBy({ id });
  }

  getAlertasEstoque() {
    // Lógica para obter alertas de estoque
    return { message: 'Alertas de estoque gerados com sucesso' };
  }
}
