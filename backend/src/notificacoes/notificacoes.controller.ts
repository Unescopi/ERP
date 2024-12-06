import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificacoesService } from './notificacoes.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Post()
  create(@Body() createNotificacaoDto: CreateNotificacaoDto) {
    return this.notificacoesService.create(createNotificacaoDto);
  }

  @Get()
  findAll() {
    return this.notificacoesService.findAll();
  }

  @Get('nao-lidas')
  findUnread() {
    return this.notificacoesService.findUnread();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificacaoDto: UpdateNotificacaoDto) {
    return this.notificacoesService.update(+id, updateNotificacaoDto);
  }

  @Patch(':id/marcar-como-lida')
  markAsRead(@Param('id') id: string) {
    return this.notificacoesService.markAsRead(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacoesService.remove(+id);
  }
}
