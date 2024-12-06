import { Test, TestingModule } from '@nestjs/testing';
import { InventoryIntegrationService } from './inventory.integration.service';
import { FornecedoresService } from '../fornecedores/fornecedores.service';
import { InventoryService } from '../inventory/inventory.service';

jest.mock('../fornecedores/fornecedores.service');
jest.mock('../inventory/inventory.service');

describe('InventoryIntegrationService', () => {
  let service: InventoryIntegrationService;
  let fornecedoresService: FornecedoresService;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryIntegrationService,
        FornecedoresService,
        InventoryService,
      ],
    }).compile();

    service = module.get<InventoryIntegrationService>(InventoryIntegrationService);
    fornecedoresService = module.get<FornecedoresService>(FornecedoresService);
    inventoryService = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processarPedidoAutomatico', () => {
    it('should update inventory based on automatic orders', async () => {
      const mockPedidos = [
        {
          produtos: [
            { produtoId: '1', quantidadeMaxima: 100 },
            { produtoId: '2', quantidadeMaxima: 50 },
          ],
        },
      ];

      jest.spyOn(fornecedoresService, 'obterPedidosAutomaticos').mockResolvedValue(mockPedidos);
      jest.spyOn(inventoryService, 'atualizarEstoque').mockResolvedValue(undefined);

      await service.processarPedidoAutomatico('fornecedorId');

      expect(inventoryService.atualizarEstoque).toHaveBeenCalledWith('1', 100);
      expect(inventoryService.atualizarEstoque).toHaveBeenCalledWith('2', 50);
    });
  });

  describe('verificarReabastecimento', () => {
    it('should log reabastecimento notification if stock is below resupply point', async () => {
      const mockFornecedores = [{ id: 'fornecedorId' }];
      const mockPedidos = [
        {
          produtos: [
            { produtoId: '1', pontoRessuprimento: 20 },
          ],
        },
      ];

      jest.spyOn(fornecedoresService, 'findAll').mockResolvedValue(mockFornecedores);
      jest.spyOn(fornecedoresService, 'obterPedidosAutomaticos').mockResolvedValue(mockPedidos);
      jest.spyOn(inventoryService, 'verificarEstoque').mockResolvedValue(10);

      const consoleSpy = jest.spyOn(console, 'log');

      await service.verificarReabastecimento();

      expect(consoleSpy).toHaveBeenCalledWith('Produto 1 precisa ser reabastecido.');
    });
  });
});
