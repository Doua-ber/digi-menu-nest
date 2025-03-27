import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { Produit } from './entities/produit.entity';
import { ManagerGuard } from 'src/manager/managerGuard';
import { AdminGuard } from 'src/admin/AdminGuard';
import { Request } from 'express';


@Controller('produit')

export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}


@Post()
@UseGuards(JwtAuthGuard,ManagerGuard)

async create(@Body() createProduitDto: CreateProduitDto, @Req() req: any) {
  const manager = req.user;
  return await this.produitService.create(createProduitDto, manager, createProduitDto.restaurantId);
}


@Get('restaurant/:id')
async getProductsByRestaurant(@Param('id') id: number): Promise<Produit[]> {
  return this.produitService.findAllByRestaurant(id);
}

    

  @Get()
  @UseGuards(JwtAuthGuard,AdminGuard)

  async findAll(@Res({ passthrough: true }) response: Response) {
    
    

    return await this.produitService.findAll();
  }

  @Get(':id')
    async findOne(@Param('id') id: string) {
    return await this.produitService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return await this.produitService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,ManagerGuard)
  async remove(@Param('id') id: string) {
    return await this.produitService.remove(+id);
  }

}