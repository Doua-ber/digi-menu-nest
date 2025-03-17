import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Manager } from 'src/manager/entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Manager])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule,UserService],
  
})
export class UserModule {}
