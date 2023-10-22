import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Region } from '@Employee/entities/region.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('countries')
export class Country {
  @ApiProperty()
  @PrimaryColumn({ length: 2 })
  country_id: string;

  @ApiProperty()
  @Column()
  country_name: string;

  @ApiProperty()
  @ManyToOne(() => Region, (region: Region) => region.region_id)
  @JoinColumn({ name: 'region_id' })
  region: Region;
}
