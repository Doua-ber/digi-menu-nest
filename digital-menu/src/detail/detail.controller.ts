import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailService } from './detail.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { AddProduitDto } from './dto/add_ProduitDto';


@Controller('commandes/:id/details')
export class DetailController {
    constructor(private readonly detailService: DetailService) {}

    @Post()
async addProduit(
    @Param('id') commandeId: string,
    @Body() body: AddProduitDto
) {
    return this.detailService.addProduitToCommande(
        parseInt(commandeId),
        body.produitId,
        body.quantite
    );
}


    @Get()
    async getDetails(@Param('id') commandeId: number) {
        return this.detailService.getDetailsByCommande(commandeId);
    }

    @Delete(':detailId')
    async removeDetail(@Param('detailId') detailId: number) {
        return this.detailService.removeDetail(detailId);
    }
}
