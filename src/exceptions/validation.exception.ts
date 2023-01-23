import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';


export class ValidationException extends HttpException {
    messages;

    constructor(responce) {
        super(responce, HttpStatus.BAD_REQUEST);
        this.messages = responce;
    }
}