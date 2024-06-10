import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDate, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class SignuUpDto { 
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    dob?: string;
}
