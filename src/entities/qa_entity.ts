import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Qa {
    @PrimaryGeneratedColumn()
    qa_id!: number;
  
    @Column()
    question!: string;
  
    @Column()
    answer!: string;

    @Column()
    product_id!: number;

  }