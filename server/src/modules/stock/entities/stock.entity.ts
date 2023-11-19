import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_history')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 4 })
  price: number;

  @Column()
  timestamp: number;
}
