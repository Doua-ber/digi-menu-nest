import { IsArray, IsOptional } from "class-validator";

export class CreateRoleDto {
    titleEng;
    @IsArray()
  @IsOptional()  // Permet de ne pas rendre ce champ obligatoire
  permissions?: number[];
    
  
}
