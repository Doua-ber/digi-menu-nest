import { PartialType } from '@nestjs/swagger';
import { CreateRubriqueDto } from './create-rubrique.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRubriqueDto extends PartialType(CreateRubriqueDto) {
    @IsOptional()
    @IsString()
      nomEng?: string;
    
      @IsOptional()
      @IsString()
      nomAr?: string;
}
