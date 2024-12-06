import { Controller, Get } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('vendas')
  gerarRelatorioVendas() {
    return this.relatoriosService.gerarRelatorioVendas();
  }

  @Get('vendas-detalhadas')
  getVendasDetalhadas() {
    return this.relatoriosService.getVendasDetalhadas();
  }

  @Get('estoque')
  gerarRelatorioEstoque() {
    return this.relatoriosService.gerarRelatorioEstoque();
  }

  @Get('estoque-detalhado')
  getEstoqueDetalhado() {
    return this.relatoriosService.getEstoqueDetalhado();
  }
}
