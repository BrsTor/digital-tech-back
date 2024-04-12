import { IsIn, IsString } from "class-validator";
import { status } from "../post.entity";


export class PatchPostStatusDto {

    @IsString()
    @IsIn(status)
    status: string
}