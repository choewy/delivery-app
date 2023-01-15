import { BadRequestException, NotFoundException } from '@nestjs/common';

export class NotFoundOrderException extends NotFoundException {}
export class OrderIsNotAcceptableException extends BadRequestException {}
