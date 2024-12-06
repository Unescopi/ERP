import { Injectable } from '@nestjs/common';
import { FornecedoresService } from '../fornecedores/fornecedores.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class InventoryIntegrationService {
  constructor(
    private readonly fornecedoresService: FornecedoresService,
    private readonly inventoryService: InventoryService,
  ) {}

  async processarPedidoAutomatico(fornecedorId: string) {
    const pedidos = await this.fornecedoresService.obterPedidosAutomaticos(fornecedorId);

    for (const pedido of pedidos) {
      for (const produto of pedido.produtos) {
        await this.inventoryService.atualizarEstoque(produto.produtoId, produto.quantidadeMaxima);
      }
    }
  }

  async verificarReabastecimento() {
    const fornecedores = await this.fornecedoresService.findAll();

    for (const fornecedor of fornecedores) {
      const pedidos = await this.fornecedoresService.obterPedidosAutomaticos(fornecedor.id);

      for (const pedido of pedidos) {
        for (const produto of pedido.produtos) {
          const estoqueAtual = await this.inventoryService.verificarEstoque(produto.produtoId);

          if (estoqueAtual < produto.pontoRessuprimento) {
            // Enviar notificação de reabastecimento
            console.log(`Produto ${produto.produtoId} precisa ser reabastecido.`);
          }
        }
      }
    }
  }
}
