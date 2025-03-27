import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RubriqueService } from './rubrique.service';
import { CreateRubriqueDto } from './dto/create-rubrique.dto';
import { UpdateRubriqueDto } from './dto/update-rubrique.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { ManagerGuard } from 'src/manager/managerGuard';

@Controller('rubrique')
export class RubriqueController {
  constructor(private readonly rubriqueService: RubriqueService) {}

  @Post()
@UseGuards(JwtAuthGuard, ManagerGuard)
async create(@Body() dto: CreateRubriqueDto, @Req() req: any) {
  const manager = req.user;
  return await this.rubriqueService.create(dto, manager);
}
@Get('restaurant/:id')
async findByRestaurant(@Param('id') id: string) {
  const restaurantId = parseInt(id, 10);
  return await this.rubriqueService.findAllByRestaurant(restaurantId);
}



  @Get()
  async findAll() {
    return await this.rubriqueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rubriqueService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRubriqueDto: UpdateRubriqueDto) {
    return await this.rubriqueService.update(+id, updateRubriqueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rubriqueService.remove(+id);
  }
}
