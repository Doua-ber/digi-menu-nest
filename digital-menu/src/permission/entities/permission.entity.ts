import { Role } from "../../role/entities/role.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleEng: string;

  @Column({nullable:true})
  titleAr: string;

  @Column()
  scope: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
