import { HttpStatus } from '@commons/http-status';

export default class Response {

    static Ok(data: any = {}, headers?: any) {
        return this.parser(HttpStatus.OK,data, headers)
    }
    
    static Created(data: any = {}, headers?: any) {
        return this.parser(HttpStatus.CREATED, data, headers);
    }
    
    static NoContent() {
        return this.parser(HttpStatus.NO_CONTENT);
    }

    static parser(statusCode: number, data?: any, headers?: any) {
        data = data || {};
        headers =  headers || {};
        return {
            statusCode,
            headers: {...headers,...{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Expose-Headers': 'X-Total-Count',
                'Access-Control-Allow-Credentials': false}},
            body: JSON.stringify(data)
        };
    }
}