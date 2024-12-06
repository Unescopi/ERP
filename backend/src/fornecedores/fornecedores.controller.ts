import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { AvaliacaoFornecedorDto } from './dto/avaliacao-fornecedor.dto';
import { PedidoAutomaticoDto } from './dto/pedido-automatico.dto';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Post()
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedoresService.create(createFornecedorDto);
  }

  @Get()
  findAll() {
    return this.fornecedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fornecedoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFornecedorDto: UpdateFornecedorDto) {
    return this.fornecedoresService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fornecedoresService.remove(id);
  }

  // Avaliação de Fornecedores
  @Post(':id/avaliar')
  avaliarFornecedor(@Param('id') id: string, @Body() avaliacaoDto: AvaliacaoFornecedorDto) {
    return this.fornecedoresService.avaliarFornecedor(id, avaliacaoDto);
  }

  // Pedidos Automáticos
  @Post(':id/pedidos-automaticos')
  configurarPedidoAutomatico(@Param('id') id: string, @Body() pedidoDto: PedidoAutomaticoDto) {
    return this.fornecedoresService.configurarPedidoAutomatico(id, pedidoDto);
  }

  @Get(':id/pedidos-automaticos')
  obterPedidosAutomaticos(@Param('id') id: string) {
    return this.fornecedoresService.obterPedidosAutomaticos(id);
  }
}
