import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { JwtClientAuthGuard } from 'src/auth-client/jwt-authClient.guard';
import { ClientGuard } from 'src/client/clientGard';
import { UpdateStatutCommandeDto } from './dto/update-statut-commande.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { ManagerGuard } from 'src/manager/managerGuard';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @UseGuards(JwtClientAuthGuard,
    //ClientGuard
  )
  @Post(':id') // <-- ':id' = ID du restaurant
async create(
  @Param('id') restaurantId: number,
  @Body() createCommandeDto: CreateCommandeDto,
  @Req() req: any,
) {
  const client = req.client;
  return await this.commandeService.createCommande(createCommandeDto, client, Number(restaurantId));
}

@Patch('changer-statut')
@UseGuards(JwtAuthGuard,ManagerGuard)
async updateStatutCommande(
  @Body() dto: UpdateStatutCommandeDto,
  @Req() req: any
  
) {
  console.log("Manager extrait du req:", req.user);

  return this.commandeService.changerStatutCommande(
    dto.commandeId,
    dto.nouveauStatut,
    req.user.id
    
  );
}




/*
  @Get()
  findAll() {
    return this.commandeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }
*/
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
