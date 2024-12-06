import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  findAll() {
    return this.estoqueService.findAll();
  }

  @Get('alertas')
  getAlertasEstoque() {
    return this.estoqueService.getAlertasEstoque();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    return this.estoqueService.update(+id, updateEstoqueDto);
  }

  @Patch(':id/alerta')
  updateAlert(@Param('id') id: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    return this.estoqueService.updateAlert(+id, updateEstoqueDto);
  }
}
