import { Controller, Get } from '@nestjs/common';
import { RelatoriosDetalhadosService } from './relatorios-detalhados.service';

@Controller('relatorios-detalhados')
export class RelatoriosDetalhadosController {
  constructor(private readonly relatoriosDetalhadosService: RelatoriosDetalhadosService) {}

  @Get('vendas')
  getVendasReport() {
    return this.relatoriosDetalhadosService.getVendasReport();
  }

  @Get('estoque')
  getEstoqueReport() {
    return this.relatoriosDetalhadosService.getEstoqueReport();
  }
}
