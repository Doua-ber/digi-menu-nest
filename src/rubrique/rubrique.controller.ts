import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RubriqueService } from './rubrique.service';
import { CreateRubriqueDto } from './dto/create-rubrique.dto';
import { UpdateRubriqueDto } from './dto/update-rubrique.dto';

@Controller('rubrique')
export class RubriqueController {
  constructor(private readonly rubriqueService: RubriqueService) {}

  @Post()
  async create(@Body() createRubriqueDto: CreateRubriqueDto) {
    return await this.rubriqueService.create(createRubriqueDto);
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
