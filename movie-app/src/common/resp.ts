
import { HttpStatus } from '@nestjs/common';

export const httpResponse = ( 
    status = HttpStatus.OK, message: string, data?: any) => {
    return {
        status: status,
        message: message,
        data: data || [],
    };
};