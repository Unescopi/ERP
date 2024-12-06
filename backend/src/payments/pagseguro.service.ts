import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentConfigService } from './payment.config.service';

@Injectable()
export class PagSeguroService {
  constructor(private readonly paymentConfigService: PaymentConfigService) {}

  async createPayment(amount: number, description: string) {
    const config = this.paymentConfigService.getPagSeguroConfig();
    const paymentData = {
      email: config.email,
      token: config.token,
      currency: 'BRL',
      itemId1: '1',
      itemDescription1: description,
      itemAmount1: amount.toFixed(2),
      itemQuantity1: '1',
    };

    try {
      const response = await axios.post('https://ws.pagseguro.uol.com.br/v2/checkout', paymentData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async generateQRCode(amount: number, description: string) {
    const payment = await this.createPayment(amount, description);
    // Assuming PagSeguro returns a payment URL, convert it to a QR Code
    return `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(payment.checkoutUrl)}`;
  }
}
