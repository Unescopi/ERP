import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentConfigService {
  private mercadoPagoConfig = {
    accessToken: 'YOUR_ACCESS_TOKEN',
  };

  private pagSeguroConfig = {
    email: 'YOUR_EMAIL',
    token: 'YOUR_TOKEN',
  };

  private selectedGateway: 'mercadopago' | 'pagseguro' = 'mercadopago';

  getMercadoPagoConfig() {
    return this.mercadoPagoConfig;
  }

  updateMercadoPagoConfig(accessToken: string) {
    this.mercadoPagoConfig.accessToken = accessToken;
  }

  getPagSeguroConfig() {
    return this.pagSeguroConfig;
  }

  updatePagSeguroConfig(email: string, token: string) {
    this.pagSeguroConfig.email = email;
    this.pagSeguroConfig.token = token;
  }

  getSelectedGateway() {
    return this.selectedGateway;
  }

  updateSelectedGateway(gateway: 'mercadopago' | 'pagseguro') {
    this.selectedGateway = gateway;
  }
}
