import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity()
export class Features {
  @PrimaryGeneratedColumn()
  feature_id!: number;

  @Column()
  feature_name!: string;

  @Column()
  sdg_no!: number;

  @Column()
  product_id!: number;
}