import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './types/AccessToken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(username: string, password: string): Promise<AccessToken> {
    const user: User | null = await this.userService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(username: string, password: string) {
    return this.userService.create({ username, password });
  }
}
