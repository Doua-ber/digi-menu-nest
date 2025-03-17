import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './entities/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager,Role,User])],
  controllers: [ManagerController],
  providers: [ManagerService],
  //exports: [TypeOrmModule,ManagerService],
})
export class ManagerModule {}
