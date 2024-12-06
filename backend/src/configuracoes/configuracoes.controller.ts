import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';
import { ImpressoraDto } from './dto/impressora.dto';
import { LojaDto } from './dto/loja.dto';

@Controller('configuracoes')
export class ConfiguracoesController {
  constructor(private readonly configuracoesService: ConfiguracoesService) {}

  @Get()
  findAll() {
    return this.configuracoesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfiguracaoDto: UpdateConfiguracaoDto) {
    return this.configuracoesService.update(+id, updateConfiguracaoDto);
  }

  // Endpoints de Impressoras
  @Get('impressoras')
  getImpressoras() {
    return this.configuracoesService.getImpressoras();
  }

  @Post('impressoras')
  addImpressora(@Body() impressoraDto: ImpressoraDto) {
    return this.configuracoesService.addImpressora(impressoraDto);
  }

  @Delete('impressoras/:id')
  removeImpressora(@Param('id') id: string) {
    return this.configuracoesService.removeImpressora(+id);
  }

  @Patch('impressoras/:id')
  updateImpressora(@Param('id') id: string, @Body() impressoraDto: ImpressoraDto) {
    return this.configuracoesService.updateImpressora(+id, impressoraDto);
  }

  @Post('impressoras/:id/print')
  print(@Param('id') id: string, @Body() dados: any) {
    return this.configuracoesService.print(+id, dados);
  }

  @Get('impressoras/:id/status')
  getPrinterStatus(@Param('id') id: string) {
    return this.configuracoesService.getPrinterStatus(+id);
  }

  // Endpoints de Configurações da Loja
  @Get('loja')
  getConfiguracoesLoja() {
    return this.configuracoesService.getConfiguracoesLoja();
  }

  @Patch('loja')
  updateConfiguracoesLoja(@Body() lojaDto: LojaDto) {
    return this.configuracoesService.updateConfiguracoesLoja(lojaDto);
  }

  // Endpoints de Integrações
  @Get('integracoes')
  getIntegracoes() {
    return this.configuracoesService.getIntegracoes();
  }

  @Patch('integracoes/:tipo')
  updateIntegracao(
    @Param('tipo') tipo: string,
    @Body() config: { [key: string]: any }
  ) {
    return this.configuracoesService.updateIntegracao(tipo, config);
  }
}
