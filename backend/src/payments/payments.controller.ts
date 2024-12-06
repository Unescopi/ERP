import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentConfigService } from './payment.config.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentConfigService: PaymentConfigService) {}

  @Get('config/mercadopago')
  getMercadoPagoConfig() {
    return this.paymentConfigService.getMercadoPagoConfig();
  }

  @Post('config/mercadopago')
  updateMercadoPagoConfig(@Body('accessToken') accessToken: string) {
    this.paymentConfigService.updateMercadoPagoConfig(accessToken);
    return { message: 'MercadoPago configuration updated successfully.' };
  }

  @Get('config/pagseguro')
  getPagSeguroConfig() {
    return this.paymentConfigService.getPagSeguroConfig();
  }

  @Post('config/pagseguro')
  updatePagSeguroConfig(@Body('email') email: string, @Body('token') token: string) {
    this.paymentConfigService.updatePagSeguroConfig(email, token);
    return { message: 'PagSeguro configuration updated successfully.' };
  }

  @Get('config/gateway')
  getSelectedGateway() {
    return this.paymentConfigService.getSelectedGateway();
  }

  @Post('config/gateway')
  updateSelectedGateway(@Body('gateway') gateway: 'mercadopago' | 'pagseguro') {
    this.paymentConfigService.updateSelectedGateway(gateway);
    return { message: 'Payment gateway updated successfully.' };
  }
}
