import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FiadosService } from './fiados.service';
import { CreateFiadoDto } from './dto/create-fiado.dto';
import { UpdateFiadoDto } from './dto/update-fiado.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('fiados')
export class FiadosController {
  constructor(private readonly fiadosService: FiadosService) {}

  @Post()
  create(@Body() createFiadoDto: CreateFiadoDto) {
    return this.fiadosService.create(createFiadoDto);
  }

  @Get()
  findAll() {
    return this.fiadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiadoDto: UpdateFiadoDto) {
    return this.fiadosService.update(+id, updateFiadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fiadosService.remove(+id);
  }
}
