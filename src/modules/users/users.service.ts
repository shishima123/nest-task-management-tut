import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  me(): string {
    return 'me';
  }
}
