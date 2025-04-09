import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends Error {
    constructor(
        public code: string,
        message?: string,
    ) {
        super(message);
        Error.captureStackTrace(this, new.target);
    }
}

export class AppHttpException extends HttpException {
    constructor(
        public code: string,
        message?: string,
        httpCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    ) {
        super(message || code, httpCode);
        Error.captureStackTrace(this, new.target);
    }
}

// Bad Request (400)
export class AppHttpBadRequest extends AppHttpException {
    constructor(code: string, message?: string) {
        super(code, message, HttpStatus.BAD_REQUEST);
    }
}

// Unauthorized (401)
export class AppHttpUnauthorizedException extends AppHttpException {
    constructor(code: string, message?: string) {
        super(code, message, HttpStatus.UNAUTHORIZED);
    }
}

// Internal Server Error (500)
export class AppHttpInternalServerException extends AppHttpException {
    constructor(code: string, message?: string) {
        super(code, message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
