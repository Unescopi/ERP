import { Injectable, NotFoundException } from '@nestjs/common';
import { ImpressoraDto } from './dto/impressora.dto';
import { LojaDto } from './dto/loja.dto';
import { PrinterService } from './services/printer.service';

@Injectable()
export class ConfiguracoesService {
  constructor(private readonly printerService: PrinterService) {}

  private configuracoes = [
    { id: 1, chave: 'tema', valor: 'claro' },
    { id: 2, chave: 'idioma', valor: 'pt-BR' },
  ];

  private impressoras: Array<ImpressoraDto & { id: number }> = [];
  private configuracoesLoja: LojaDto = null;
  private integracoes = {
    gateway_pagamento: {
      ativo: false,
      credenciais: {},
    },
    nfe: {
      ativo: false,
      certificado: '',
      ambiente: 'homologacao',
    },
    delivery: {
      ativo: false,
      plataformas: [],
    },
  };

  findAll() {
    return this.configuracoes;
  }

  update(id: number, updateConfiguracaoDto: any) {
    const configuracao = this.configuracoes.find(c => c.id === id);
    if (configuracao) {
      Object.assign(configuracao, updateConfiguracaoDto);
    }
    return configuracao;
  }

  // Gerenciamento de Impressoras
  async getImpressoras() {
    const impressorasComStatus = await Promise.all(
      this.impressoras.map(async (impressora) => ({
        ...impressora,
        status: await this.printerService.getPrinterStatus(impressora.id),
      }))
    );
    return impressorasComStatus;
  }

  async addImpressora(impressoraDto: ImpressoraDto) {
    const id = this.impressoras.length + 1;
    const novaImpressora = { ...impressoraDto, id };
    
    // Tenta conectar com a impressora
    const connected = await this.printerService.connectPrinter(id, impressoraDto);
    if (!connected) {
      throw new Error('Não foi possível conectar à impressora');
    }

    this.impressoras.push(novaImpressora);
    return novaImpressora;
  }

  async removeImpressora(id: number) {
    const index = this.impressoras.findIndex(imp => imp.id === id);
    if (index === -1) {
      throw new NotFoundException(`Impressora com ID ${id} não encontrada`);
    }

    // Desconecta a impressora antes de remover
    await this.printerService.disconnectPrinter(id);
    this.impressoras.splice(index, 1);
    return { message: 'Impressora removida com sucesso' };
  }

  async updateImpressora(id: number, impressoraDto: ImpressoraDto) {
    const impressora = this.impressoras.find(imp => imp.id === id);
    if (!impressora) {
      throw new NotFoundException(`Impressora com ID ${id} não encontrada`);
    }

    // Reconecta a impressora com as novas configurações
    await this.printerService.disconnectPrinter(id);
    const connected = await this.printerService.connectPrinter(id, impressoraDto);
    if (!connected) {
      throw new Error('Não foi possível reconectar à impressora com as novas configurações');
    }

    Object.assign(impressora, impressoraDto);
    return impressora;
  }

  // Método para impressão
  async print(impressoraId: number, dados: any) {
    return this.printerService.print(impressoraId, dados);
  }

  // Configurações da Loja
  getConfiguracoesLoja() {
    if (!this.configuracoesLoja) {
      this.configuracoesLoja = {
        nome: '',
        cnpj: '',
        endereco: '',
        telefone: '',
        email: '',
        horarioFuncionamento: [],
        logoUrl: '',
      };
    }
    return this.configuracoesLoja;
  }

  updateConfiguracoesLoja(lojaDto: LojaDto) {
    this.configuracoesLoja = { ...this.configuracoesLoja, ...lojaDto };
    return this.configuracoesLoja;
  }

  // Integrações
  getIntegracoes() {
    return this.integracoes;
  }

  updateIntegracao(tipo: string, config: { [key: string]: any }) {
    if (!this.integracoes[tipo]) {
      throw new NotFoundException(`Integração do tipo ${tipo} não encontrada`);
    }
    this.integracoes[tipo] = { ...this.integracoes[tipo], ...config };
    return this.integracoes[tipo];
  }
}
