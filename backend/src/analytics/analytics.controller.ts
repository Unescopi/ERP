import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AnaliseService } from './services/analise.service';
import { RelatorioService } from './services/relatorio.service';
import {
  AnaliseVendasDto,
  PrevisaoVendasDto,
  RelatorioPersonalizadoDto,
  KPIConfigDto,
  AlertaDto,
} from './dto/analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analiseService: AnaliseService,
    private readonly relatorioService: RelatorioService,
  ) {}

  // Endpoints de Análise
  @Post('vendas/analise')
  analisarVendas(@Body() params: AnaliseVendasDto) {
    return this.analiseService.analisarVendas(params);
  }

  @Post('vendas/previsao')
  preverVendas(@Body() params: PrevisaoVendasDto) {
    return this.analiseService.preverVendas(params);
  }

  @Get('kpis')
  monitorarKPIs() {
    return this.analiseService.monitorarKPIs();
  }

  // Endpoints de Relatórios
  @Post('relatorios/personalizado')
  gerarRelatorioPersonalizado(@Body() config: RelatorioPersonalizadoDto) {
    return this.relatorioService.gerarRelatorioPersonalizado(config);
  }

  @Get('relatorios/:tipo')
  gerarRelatorioAutomatico(@Param('tipo') tipo: string) {
    return this.relatorioService.gerarRelatorioAutomatico(tipo);
  }

  // Endpoints de Dashboard
  @Get('dashboard/tempo-real')
  getDashboardTempoReal() {
    return this.analiseService.monitorarKPIs();
  }

  @Get('dashboard/resumo')
  getDashboardResumo(@Query('periodo') periodo: string) {
    return this.analiseService.analisarVendas({
      dataInicio: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
      dataFim: new Date().toISOString(),
      agrupamento: 'DIA' as any,
    });
  }
}
