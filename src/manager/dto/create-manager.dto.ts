import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateManagerDto {
    @IsNotEmpty()
      @IsString()
      nom: string;
    
      @IsNotEmpty()
      @IsEmail()
      email: string;
    
      @IsNotEmpty()
      @IsString()
      motDePasse: string;
    
      @IsOptional()
      isOwner?: boolean;
    
      @IsNotEmpty()
      @IsInt()
      roleId: number; 
    
}
