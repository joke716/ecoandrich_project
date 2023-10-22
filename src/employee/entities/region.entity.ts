import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('regions')
export class Region {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  region_id: number;

  @ApiProperty()
  @Column()
  region_name: string;
}
