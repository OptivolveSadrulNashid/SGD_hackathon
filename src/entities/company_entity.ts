import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";


@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  company_id!: number;

  @Column()
  name!: string;

  @Column()
  objective!: string;

  @Column("simple-json")
  goals!: { goals1: string, goals2: string, goals3: string }; ;
}