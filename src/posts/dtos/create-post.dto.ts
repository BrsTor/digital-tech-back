import { IsString, IsOptional, IsNotEmpty, IsIn, IsDate} from "class-validator";
import { status } from "../post.entity";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsDate()
    @IsNotEmpty()
    created_at: Date;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(status)
    status: string;

    @IsString()
    @IsOptional()
    image: string;

    /* TODO - Relationship with User */
}