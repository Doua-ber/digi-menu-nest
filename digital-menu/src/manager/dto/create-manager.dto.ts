import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateManagerDto {
    @IsNotEmpty()
      @IsString()
      nom: string;

      @IsNotEmpty()
      @IsString()
      prenom: string;

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
      
      //win y7eb y5admou (fi ena resto)
      restaurantId?: number;
    
}
