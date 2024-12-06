import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { AvaliacaoFornecedorDto } from './dto/avaliacao-fornecedor.dto';
import { PedidoAutomaticoDto } from './dto/pedido-automatico.dto';
import { Fornecedor } from './entities/fornecedor.entity';

@Injectable()
export class FornecedoresService {
  constructor(
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
  ) {}

  create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    const fornecedor = this.fornecedorRepository.create(createFornecedorDto);
    return this.fornecedorRepository.save(fornecedor);
  }

  findAll(): Promise<Fornecedor[]> {
    return this.fornecedorRepository.find();
  }

  findOne(id: string): Promise<Fornecedor> {
    return this.fornecedorRepository.findOneBy({ id });
  }

  async update(id: string, updateFornecedorDto: UpdateFornecedorDto): Promise<Fornecedor> {
    await this.fornecedorRepository.update(id, updateFornecedorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.fornecedorRepository.delete(id);
  }

  // Avaliação de Fornecedores
  async avaliarFornecedor(id: string, avaliacaoDto: AvaliacaoFornecedorDto): Promise<Fornecedor> {
    const fornecedor = await this.findOne(id);
    if (!fornecedor) throw new Error('Fornecedor não encontrado');

    fornecedor.avaliacoes.push(avaliacaoDto);
    fornecedor.mediaAvaliacao = this.calcularMediaAvaliacao(fornecedor.avaliacoes);
    return this.fornecedorRepository.save(fornecedor);
  }

  private calcularMediaAvaliacao(avaliacoes: AvaliacaoFornecedorDto[]): number {
    const total = avaliacoes.reduce((acc, avaliacao) => acc + (avaliacao.qualidadeProdutos + avaliacao.pontualidadeEntrega + avaliacao.atendimento + avaliacao.precos + avaliacao.condicoesComerciais) / 5, 0);
    return total / avaliacoes.length;
  }

  // Pedidos Automáticos
  async configurarPedidoAutomatico(id: string, pedidoDto: PedidoAutomaticoDto): Promise<Fornecedor> {
    const fornecedor = await this.findOne(id);
    if (!fornecedor) throw new Error('Fornecedor não encontrado');

    fornecedor.pedidosAutomaticos.push(pedidoDto);
    return this.fornecedorRepository.save(fornecedor);
  }

  async obterPedidosAutomaticos(id: string): Promise<any[]> {
    const fornecedor = await this.findOne(id);
    if (!fornecedor) throw new Error('Fornecedor não encontrado');

    return fornecedor.pedidosAutomaticos;
  }
}
