import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { ManagerGuard } from 'src/manager/managerGuard';
import { CreateRoleManagerDto } from './dto/create-roleManager.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
@UseGuards()
  @Post('manager')
  @UseGuards(JwtAuthGuard,ManagerGuard)
  createManagerRole(@Body() createRoleManagerDto: CreateRoleManagerDto, @Req() req: any): Promise<Role> {
    const superManagerId= req.user.id;
    return this.roleService.createManagerRole(createRoleManagerDto,superManagerId,createRoleManagerDto.restaurantId);
  }

  @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.roleService.create(createRoleDto);
    }


  @Get('restaurant/:restoId')
  //ParseIntPipe pour convertir restoId de nbre a un entier
  findAllByResto(@Param('restoId', ParseIntPipe) restoId: number) {
    return this.roleService.findAllByResto(restoId);
  }
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
