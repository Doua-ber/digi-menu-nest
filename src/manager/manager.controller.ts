import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { PermissionsGuard } from 'src/permission/permissions.guard';
import { Permissions } from 'src/permission/permissions.decorator';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Post()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('add manager')

create(@Body() createManagerDto: CreateManagerDto) {
  return this.managerService.create(createManagerDto);
}

  @Get(':id')
  @UseGuards(JwtAuthGuard) //just lezmou ykoun connecter
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Get()
  @UseGuards(JwtAuthGuard) //just lezmou ykoun connecter
  findAll() {
    return this.managerService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('edit manager')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard) 
  @Permissions('delete manager')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}