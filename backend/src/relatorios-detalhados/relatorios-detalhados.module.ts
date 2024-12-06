import { Module } from '@nestjs/common';
import { RelatoriosDetalhadosService } from './relatorios-detalhados.service';
import { RelatoriosDetalhadosController } from './relatorios-detalhados.controller';

@Module({
  controllers: [RelatoriosDetalhadosController],
  providers: [RelatoriosDetalhadosService],
})
export class RelatoriosDetalhadosModule {}
