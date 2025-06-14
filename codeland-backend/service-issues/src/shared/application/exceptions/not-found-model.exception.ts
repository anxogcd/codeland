import { HttpException } from '@nestjs/common';

export class NotFoundModelException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}
