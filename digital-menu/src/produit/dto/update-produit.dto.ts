import { PartialType } from '@nestjs/swagger';
import { CreateProduitDto } from './create-produit.dto';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
    nomEng?: string;
  nomAr?: string;
  descEng?: string;
  descAr?: string;
  prix?: number;
  image?: string;
  stock?: number;
  disponibilite?: boolean;
  rubriqueId?: number;
  restaurantId?: number;
}
