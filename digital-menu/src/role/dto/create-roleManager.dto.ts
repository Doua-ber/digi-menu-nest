import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleManagerDto {
    @IsString()
    titleEng;

    @IsArray()
    permissions: number[];
    
    @IsNumber()
    restaurantId:number;

    
  
}
