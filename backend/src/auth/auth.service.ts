import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuariosService.findOneByEmail(email);
    if (user && user.senha === pass) { // Adicionar hash de senha
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.nome, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Implementar lógica de registro
    return { message: 'Usuário registrado com sucesso' };
  }

  async refreshToken(refreshToken: string) {
    // Implementar lógica de refresh token
    return { message: 'Token atualizado com sucesso' };
  }

  async logout(user: any) {
    // Implementar lógica de logout
    return { message: 'Usuário deslogado com sucesso' };
  }
}
