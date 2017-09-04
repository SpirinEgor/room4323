export class Body {
    status: string;
    errors: ErrorFields[] = [];
};

class ErrorFields {
    field: string;
    error: string;
};

export const successful = 'OK';
export const error = 'FAIL';
