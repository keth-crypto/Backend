import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

type UsersServiceType = {
  createUser(username: string, password: string): Promise<any>;
};

declare const require: any;

const { UsersService } = require('../users/users.service') as {
  UsersService: {
    new (): UsersServiceType;
  };
};

export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersServiceType
  ) {}

  async register(body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }

  async login(body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) return { error: 'Invalid credentials' };
    return this.authService.login(user);
  }

  async logout(body: { userId: number }) {
    return this.authService.logout(body.userId);
  }

  async refresh(body: { refreshToken: string }) {
    return this.authService.refreshTokens(body.refreshToken);
  }
}

// Apply Nest's legacy decorators explicitly so this file also compiles when
// TypeScript's standard decorator mode is enabled.
const controllerDecorator = Controller('auth') as any;
controllerDecorator(AuthController);

const routes = [
  ['register', { username: String, password: String }],
  ['login', { username: String, password: String }],
  ['logout', { userId: Number }],
  ['refresh', { refreshToken: String }],
] as const;

for (const [method, parameterTypes] of routes) {
  const descriptor = Object.getOwnPropertyDescriptor(AuthController.prototype, method)!;
  (Post(method) as any)(AuthController.prototype, method, descriptor);
  (Body() as any)(AuthController.prototype, method, 0);
  (Reflect as any).defineMetadata('design:paramtypes', [Object], AuthController.prototype, method);
}

(Reflect as any).defineMetadata('design:paramtypes', [AuthService, UsersService], AuthController);
