import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PDVService } from './pdv.service';
import { PagamentoDto } from './dto/pagamento.dto';

@Controller('pdv')
@UseGuards(AuthGuard('jwt'))
export class PDVController {
  constructor(private readonly pdvService: PDVService) {}

  @Get('status')
  getStatus() {
    return this.pdvService.getStatus();
  }

  @Post('venda')
  realizarVenda(@Body() vendaDto: any) {
    return this.pdvService.realizarVenda(vendaDto);
  }

  @Get('relatorios-vendas')
  gerarRelatoriosVendas() {
    return this.pdvService.gerarRelatoriosVendas();
  }

  @Post('atualizar-estoque')
  atualizarEstoque(@Body('produtoId') produtoId: number, @Body('quantidade') quantidade: number) {
    return this.pdvService.atualizarEstoque(produtoId, quantidade);
  }

  @Post('aplicar-desconto')
  aplicarDesconto(@Body('vendaId') vendaId: number, @Body('desconto') desconto: number) {
    return this.pdvService.aplicarDesconto(vendaId, desconto);
  }

  @Get('historico-transacoes')
  historicoTransacoes() {
    return this.pdvService.historicoTransacoes();
  }

  @Post('processar-pagamento')
  processarPagamento(@Body() pagamentoDto: PagamentoDto) {
    return this.pdvService.processarPagamento(pagamentoDto);
  }

  @Post('devolucao')
  processarDevolucao(@Body('vendaId') vendaId: number) {
    return this.pdvService.processarDevolucao(vendaId);
  }

  @Post('fidelidade')
  integrarFidelidade(@Body('clienteId') clienteId: number, @Body('pontos') pontos: number) {
    return this.pdvService.integrarFidelidade(clienteId, pontos);
  }

  @Get('analise-dados')
  analiseDados() {
    return this.pdvService.analiseDados();
  }

  @Post('configurar-automacao')
  configurarAutomacao(@Body() automacaoDto: any) {
    return this.pdvService.configurarAutomacao(automacaoDto);
  }

  @Post('gerenciar-usuarios')
  gerenciarUsuarios(@Body() usuarioDto: any) {
    return this.pdvService.gerenciarUsuarios(usuarioDto);
  }
}
