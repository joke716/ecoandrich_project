import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from '@Employee/entities/country.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('locations')
export class Location {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  location_id: number;

  @ApiProperty()
  @Column()
  street_address: string;

  @ApiProperty()
  @Column({ nullable: true })
  postal_code: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column({ nullable: true })
  state_province: string;

  @ApiProperty()
  @ManyToOne(() => Country, (country: Country) => country.country_id)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
