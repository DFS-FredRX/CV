import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./createUser.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
    
    @IsOptional()
    @IsBoolean()
    is_verified?: boolean

    @IsOptional()
    @IsBoolean()
    is_2fa_enabled?: boolean

    @IsOptional()
    @IsBoolean()
    is_admin?: boolean
    
}