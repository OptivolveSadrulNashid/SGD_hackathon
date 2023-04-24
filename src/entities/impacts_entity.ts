import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Impacts {
    @PrimaryGeneratedColumn()
    impact_id!: number;
  
    @Column()
    impact_name!: string;
  
    @Column()
    dimension!: string;
  
    @Column()
    order_of_effect!: string;

    @Column()
    feature_id!: number;

  }