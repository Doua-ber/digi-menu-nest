import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';
import { PermissionsGuard } from 'src/permission/permissions.guard';
import { Permissions } from 'src/permission/permissions.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('add admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
   
      createAdminDto.isAdmin = true; 
    

    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: 'Admin créé avec succès', admin: newAdmin };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('edit admin')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard) 
  @Permissions('delete admin')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
  
}
