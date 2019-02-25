import _ from 'lodash';
import { HttpStatus } from '@commons/http-status';
import templates from '@resources/message.json';
import Response from '@commons/response';

export class MSGFenixException extends Error {
    public statusCode: number;

    constructor(public code: string,
        public mergeVariables?: any,
        message?: string) {
            super(message);
        }
}

export class BadRequestException extends MSGFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.BAD_REQUEST;
    }
}

export class ConflictException extends MSGFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.CONFLICT;
    }
}

export class InternalServerException extends MSGFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.INTERNAL_ERROR_SERVER;
    }
}

export class UnauthorizedException extends MSGFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.UNAUTHORIZED;
    }
}

export class NotFound extends MSGFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.NOT_FOUND;
    }
}

export const handlerException = (MSGFenixException: MSGFenixException) => {
    const { statusCode, code, mergeVariables } = MSGFenixException;
    delete MSGFenixException.statusCode;
    const compiled = _.template(templates[code]);

    if(!mergeVariables) {
        MSGFenixException.message = compiled();
        return Response.parser(statusCode, MSGFenixException);
    }

    MSGFenixException.message = compiled(mergeVariables);
    return Response.parser(statusCode, MSGFenixException);
}