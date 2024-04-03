import { IsString, IsOptional, IsNotEmpty, IsIn, IsDate} from "class-validator";
import { status } from "../post.entity";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsIn(status)
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    image: string;

    /* TODO - Relationship with User */
}