import { IsBoolean, IsString } from "class-validator";

export class CreateIngredientDto {

    @IsString()
          nomEng: string;
        
          @IsString()
          nomAr: string;
          @IsBoolean()
      disponibilite: boolean;
}
