import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id!: number;

  @Column()
  product_name!: string;

  @Column()
  product_description!: string;

  @Column()
  audience_type!: string;

  @Column()
  company_id!: number;
}