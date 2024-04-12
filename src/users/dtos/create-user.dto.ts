import { IsString, IsOptional, IsNotEmpty, IsAlphanumeric, IsAlpha, IsIn} from "class-validator";
import { roles } from "../user.entity";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    surname: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    username: string;

    @IsString()
    @IsIn(roles)
    @IsOptional()
    role: string;

    @IsString()
    @IsOptional()
    avatar: string;
}