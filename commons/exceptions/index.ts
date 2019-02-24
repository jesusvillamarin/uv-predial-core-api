import _ from 'lodash';
import { HttpStatus } from '@commons/http-status';
import templates from '@resources/message.json';
import Response from '@commons/response';

export class MgsFenixException extends Error {
    public statusCode: number;

    constructor(public code: string,
        public mergeVariables?: any,
        message?: string) {
            super(message);
        }
}

export class BadRequestException extends MgsFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.BAD_REQUEST;
    }
}

export class ConflictException extends MgsFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.CONFLICT;
    }
}

export class InternalServerException extends MgsFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.INTERNAL_ERROR_SERVER;
    }
}

export class UnauthorizedException extends MgsFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.UNAUTHORIZED;
    }
}

export class NotFound extends MgsFenixException {
    constructor(code: string, mergeVariables?: any) {
        super(code, mergeVariables);
        this.statusCode = HttpStatus.NOT_FOUND;
    }
}

export const handlerException = (mgsFenixException: MgsFenixException) => {
    const { statusCode, code, mergeVariables } = mgsFenixException;
    delete mgsFenixException.statusCode;
    const compiled = _.template(templates[code]);

    if(!mergeVariables) {
        mgsFenixException.message = compiled();
        return Response.parser(statusCode, mgsFenixException);
    }

    mgsFenixException.message = compiled(mergeVariables);
    return Response.parser(statusCode, mgsFenixException);
}