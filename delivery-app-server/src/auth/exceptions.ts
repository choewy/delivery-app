import { BadRequestException } from '@nestjs/common';

export class AlreadyExistEmailException extends BadRequestException {}
