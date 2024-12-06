import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor() {
    mercadopago.configurations.setAccessToken('YOUR_ACCESS_TOKEN'); // Replace with your MercadoPago access token
  }

  async createPayment(amount: number, description: string) {
    const paymentData = {
      transaction_amount: amount,
      description: description,
      payment_method_id: 'pix',
      payer: {
        email: 'test_user_123456@testuser.com', // Replace with actual payer email
      },
    };

    try {
      const response = await mercadopago.payment.create(paymentData);
      return response.body;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async generateQRCode(amount: number, description: string) {
    const payment = await this.createPayment(amount, description);
    return payment.point_of_interaction.transaction_data.qr_code;
  }
}
