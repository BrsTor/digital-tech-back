import { IsString, IsNotEmpty, IsAlphanumeric } from "class-validator";

export class SignInUserDto {

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    username: string;

}