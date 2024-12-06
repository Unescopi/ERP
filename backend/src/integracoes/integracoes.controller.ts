import { Controller, Get } from '@nestjs/common';
import { IntegracoesService } from './integracoes.service';

@Controller('integracoes')
export class IntegracoesController {
  constructor(private readonly integracoesService: IntegracoesService) {}

  @Get('pagamentos')
  integrarPagamentos() {
    return this.integracoesService.integrarPagamentos();
  }

  @Get('contabilidade')
  integrarContabilidade() {
    return this.integracoesService.integrarContabilidade();
  }
}
