import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComandasService } from './comandas.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';

@Controller('comandas')
export class ComandasController {
  constructor(private readonly comandasService: ComandasService) {}

  @Post()
  create(@Body() createComandaDto: CreateComandaDto) {
    return this.comandasService.create(createComandaDto);
  }

  @Get()
  findAll() {
    return this.comandasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comandasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComandaDto: UpdateComandaDto) {
    return this.comandasService.update(+id, updateComandaDto);
  }

  @Patch(':id/lancar-produto')
  lancarProduto(@Param('id') id: string, @Body('produtoId') produtoId: number) {
    return this.comandasService.lancarProduto(+id, produtoId);
  }

  @Patch(':id/receber-pedido')
  receberPedido(@Param('id') id: string, @Body('pedidoId') pedidoId: number) {
    return this.comandasService.receberPedido(+id, pedidoId);
  }

  @Patch(':id/fechar-pdv')
  fecharNoPDV(@Param('id') id: string) {
    return this.comandasService.fecharNoPDV(+id);
  }

  @Patch(':id/associar-cliente')
  associarCliente(@Param('id') id: string, @Body('clienteId') clienteId: number) {
    return this.comandasService.associarCliente(+id, clienteId);
  }

  @Patch(':id/dividir-conta')
  dividirConta(@Param('id') id: string, @Body('quantidade') quantidade: number) {
    return this.comandasService.dividirConta(+id, quantidade);
  }

  @Patch(':id/aplicar-desconto')
  aplicarDesconto(@Param('id') id: string, @Body('desconto') desconto: number) {
    return this.comandasService.aplicarDesconto(+id, desconto);
  }

  @Get(':id/historico')
  historicoTransacoes(@Param('id') id: string) {
    return this.comandasService.historicoTransacoes(+id);
  }

  @Get(':id/status')
  statusComanda(@Param('id') id: string) {
    return this.comandasService.statusComanda(+id);
  }

  @Delete(':id')
  close(@Param('id') id: string) {
    return this.comandasService.close(+id);
  }
}
