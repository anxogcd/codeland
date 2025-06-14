import { HttpException } from '@nestjs/common';

export class ValidateVOException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}
