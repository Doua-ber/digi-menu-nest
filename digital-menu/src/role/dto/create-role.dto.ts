import { IsArray, IsOptional } from "class-validator";

export class CreateRoleDto {
    titleEng;
    @IsArray()
  
  permissions: number[];
    
  
}
