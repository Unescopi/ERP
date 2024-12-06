import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  create(@Body() createMesaDto: CreateMesaDto) {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  findAll() {
    return this.mesasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mesasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMesaDto: UpdateMesaDto) {
    return this.mesasService.update(+id, updateMesaDto);
  }

  @Patch(':id/fechar')
  fecharMesa(@Param('id') id: string) {
    return this.mesasService.fecharMesa(+id);
  }

  @Patch(':id/associar-cliente')
  associarCliente(@Param('id') id: string, @Body('clienteId') clienteId: number) {
    return this.mesasService.associarCliente(+id, clienteId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mesasService.remove(+id);
  }
}
