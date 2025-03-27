import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRubriqueDto {
    @IsString()
      nomEng: string;
    
      @IsString()
      nomAr: string;
      @IsInt()
    @IsNotEmpty()
    restaurantId: number;
}
