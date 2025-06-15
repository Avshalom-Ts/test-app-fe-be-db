import { IsNotEmptyObject, IsOptional, IsString } from "class-validator";

export class CreateStoreNameDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

}
